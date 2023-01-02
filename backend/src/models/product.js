import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  name: String,
  description: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  art: String,
});
const Product = mongoose.model("Product", ProductSchema);
export default Product;
