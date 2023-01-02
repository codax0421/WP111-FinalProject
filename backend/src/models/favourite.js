import mongoose from "mongoose";
const Schema = mongoose.Schema;
const FavouriteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  product: { type: Schema.Types.ObjectId, ref: "Product" },
});
const Favourite = mongoose.model("Favourite", FavouriteSchema);
export default Favourite;
