import express, { Router } from "express";
import Comments from "../models/comment.js";
import Product from "../models/product.js";
import User from "../models/user.js";

const router = Router();
router.use(express.json());

const CreateComment = async (newComment, userid, productid) => {
  let newcomment = await Comments({
    comment: newComment,
    user: userid,
    product: productid,
  });
  let result = await newcomment.save();
  console.log(result);
  return result;
};

const getCommentProduct = async (id) => {
  let allCom = await Comments.find({ product: { _id: id } })
    .populate("user", "username")
    .select("comment user product");
  console.log(allCom);
  return allCom;
};

router.post("/addComment", (req, res) => {
  let newComment = req.body.comment;
  let userid = req.body.user;
  let productid = req.body.product;

  CreateComment(newComment, userid, productid)
    .then((result) => {
      res.json({ data: result });
    })
    .catch((err) => {
      res.json({ data: "failed to add comment" });
    });
});

router.get("/getCommentProduct/:id", (req, res) => {
  let productid = req.params.id;
  console.log(productid);
  getCommentProduct(productid)
    .then((result) => {
      res.json({ data: result });
    })
    .catch((err) => {
      res.json({ data: "failed to get product comment" });
    });
});

export default router;
