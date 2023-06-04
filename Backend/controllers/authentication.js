import User from "../models/User.js";
import express from "express";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const router = express.Router();

/**
 * @openapi
 * /healthcheck:
 *  get:
 *     tags:
 *     - Healthcheck
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("wrong password or username");
    const hashedPassoword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET
    );
    const originalPassword = hashedPassoword.toString(CryptoJS.enc.Utf8);
    originalPassword !== req.body.password &&
      res.status(404).json("wrong password or username");

    res.status(200).json(user);
  } catch (error) {
    res.status(500);
  }
});

export default router;
