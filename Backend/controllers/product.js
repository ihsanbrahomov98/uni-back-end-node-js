import express from "express";
import Product from "../models/Product.js";
const router = express.Router();

/**
 * @openapi
 * /all:
 *  get:
 *     tags:
 *     - product controller
 *     description: get all products
 *     responses:
 *       200:
 *         description: all products are returned to FE
 *       500:
 *         description: server error while getting all products
 */

/**
 * @openapi
 * /create:
 *  post:
 *     tags:
 *     - product controller
 *     description: create single product
 *     responses:
 *       200:
 *         description: product was created
 *       500:
 *         description: server error while creating product
 */

/**
 * @openapi
 * /delete:
 *  delete:
 *     tags:
 *     - product controller
 *     description: delete one product
 *     responses:
 *       200:
 *         description: product was deleted
 *       500:
 *         description: server error while deleting product
 */

/**
 * @openapi
 * /delete/all:
 *  delete:
 *     tags:
 *     - product controller
 *     description: delete all products
 *     responses:
 *       200:
 *         description: all products were deleted
 *       500:
 *         description: server error while deleting all products
 */

/**
 * @openapi
 * /update:
 *  update:
 *     tags:
 *     - product controller
 *     description: update single product
 *     responses:
 *       200:
 *         description: product was updated
 *       500:
 *         description: server error while updating product
 */

/**
 * @openapi
 * /findone/:id:
 *  get:
 *     tags:
 *     - product controller
 *     description: get one product by its id
 *     responses:
 *       200:
 *         description: product was found and returned
 *       500:
 *         description: server error while finding a product
 */

/**
 * @openapi
 * /category/:cat:
 *  get:
 *     tags:
 *     - product controller
 *     description: get all products for given category
 *     responses:
 *       200:
 *         description:  all products for given category were found
 *       500:
 *         description: server error while finding the products of the given category
 */

// find all products
router.get("/all", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
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

//delete all products
router.delete("/delete/all", async (req, res) => {
  await Product.remove({});
  try {
    res.status(200).json("all deleted");
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

//find one product by id
router.get("/findone/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send(product);
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
