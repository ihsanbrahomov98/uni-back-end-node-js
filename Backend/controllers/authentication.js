import User from "../models/User.js";
import express from "express";
import CryptoJS from "crypto-js";

const router = express.Router();

/**
 * @openapi
 * /register:
 *  post:
 *     tags:
 *     - authentication controller
 *     description: register user
 *     responses:
 *       200:
 *         description: user is registered
 *       500:
 *         description: server error while registering an user
 */

/**
 * @openapi
 * /login:
 *  post:
 *     tags:
 *     - authentication controller
 *     description: login user
 *     responses:
 *       200:
 *         description: user is logged in
 *       401:
 *         description: wrong password or username
 *       500:
 *         description: server error while login
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
    res.status(200).json("user is registered");
  } catch (error) {
    res.status(500).json("error while registering an user");
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(404).json("wrong password or username");
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
