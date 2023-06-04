import express from "express";
import Product from "../models/Product.js";
import Review from "../models/Review.js";
const router = express.Router();

// find all products
router.get("/all", async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

// create one product
router.post("/create", async (req, res) => {
  const product = new Product(req.body);
  try {
    const savedProduct = await product.save();
    res.status(200).send(savedProduct);
  } catch (error) {
    res.status(500).send(error);
  }
});

//delete all products
router.delete("/delete/all", async (req, res) => {
  await Product.remove({});
  try {
    res.status(200).json("all deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

//find one product by id
router.get("/findone/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

//update one product
router.put("/update", async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { name: req.body.name },
      { $set: req.body },
      { new: true }
    );

    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(500).send(error);
  }
});

//delete one product
router.delete("/delete", async (req, res) => {
  try {
    const deleteOne = await Product.findOneAndDelete({
      userId: req.body.id,
    });

    res.status(200).send(deleteOne);
  } catch (error) {
    res.status(500).send(error);
  }
});

// find all products by category
router.get("/category/:cat", async (req, res) => {
  try {
    const product = await Product.find({ category: req.params.cat });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
