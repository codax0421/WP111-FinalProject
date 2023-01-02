import mongoose from "mongoose";
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
  comment: String,
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
  product: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});
const Comments = mongoose.model("Comments", CommentSchema);
export default Comments;
