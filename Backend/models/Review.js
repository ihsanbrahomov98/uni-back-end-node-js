import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  reviewText: {
    type: String,
    default: "Добър продукт!",
  },
  rating: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Review", reviewSchema);
