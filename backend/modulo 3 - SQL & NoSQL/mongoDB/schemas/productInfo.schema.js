import mongoose from "mongoose";
import ReviewSchema from "./review.schema";

const ProductInfoSchema = new mongoose.Schema(
  {
    produtId: Number,
    category: String,
    width: String,
    height: String,
    depth: String,
    reviews: [ReviewSchema]
  }
  , { collection: 'productInfo'}
)

export default ProductInfoSchema