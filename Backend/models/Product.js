import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    name: {
      type: String,
    },
    img: {
      type: String,
    },
    description: {
      type: String,
    },
    color: [
      {
        type: String,
      },
    ],
    size: [
      {
        type: String,
      },
    ],
    price: {
      type: String,
    },
    amount: {
      type: Number,
    },
    category: {
      type: String,
    },
  },

  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
