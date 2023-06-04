import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
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
    rating: {
      type: String,
      default: 5,
    },
  },

  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
