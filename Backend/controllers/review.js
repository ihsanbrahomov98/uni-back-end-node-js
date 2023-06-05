import express from "express";
import Product from "../models/Product.js";
import Review from "../models/Review.js";

const router = express.Router();

/**
 * @openapi
 * /add:
 *  post:
 *     tags:
 *     - review controller
 *     description: add review
 *     responses:
 *       200:
 *         description: review is added
 *       500:
 *         description: An error occurred while saving the review
 */

/**
 * @openapi
 * /all/:id:
 *  get:
 *     tags:
 *     - review controller
 *     description: login user
 *     responses:
 *       200:
 *         description: user is logged in
 *       401:
 *         description: wrong password or username
 *       505:
 *         description: server error while login
 */

router.post("/add", async (req, res) => {
  try {
    const { productId, userId, reviewText, rating } = req.body;

    const review = new Review({
      reviewText,
      rating,
      product: productId,
      user: userId,
    });
    await review.save();

    res.status(200).json(review);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while saving the review." });
  }
});

router.get("/all/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    const reviews = await Review.find({ product: productId })
      .populate("user")
      .exec();

    res.status(200).json(reviews);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the reviews2." });
  }
});

export default router;
