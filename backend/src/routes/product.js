import express, { Router } from "express";
import { ObjectId } from "mongoose";
import Comments from "../models/comment.js";
import Product from "../models/product.js";
import User from "../models/user.js";
import favourite from "../models/favourite.js";
import multer from "multer";
import fs from "fs";
import { create, globSource, ipfsClient } from "ipfs-http-client";
const upload = multer({ dest: "uploads/" });
const router = Router();
router.use(express.json());
const auth =
  "Basic " +
  Buffer.from(
  //enter ur own infura
  ).toString("base64");
const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const createProduct = async (productname, productdes, userid, art) => {
  const newProduct = new Product({
    name: productname,
    description: productdes,
    author: userid,
    art: "https://ipfs.io/ipfs/" + art,
  });
  let result = await newProduct.save();
  console.log(result);
  return result;
};

const findAllproduct = async () => {
  let searchProduct = await Product.find()
    .populate("author")
    .select("name description author comments art");
  console.log(searchProduct);
  return searchProduct;
};

const getProductById = async (id) => {
  let searchById = await Product.findById(id)
    .populate("author")
    .select("name description author comments art");
  console.log(searchById);
  return searchById;
};

const getProductByUser = async (id) => {
  let searchById = await Product.find({ author: { _id: id } }).select(" art");
  console.log(searchById);
  return searchById;
};

const getProductSearch = async (search) => {
  console.log(search);
  let searchBy = await Product.find({
    $or: [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ],
  });
  console.log(searchBy);
  return searchBy;
};

router.post("/addProduct", upload.array("files"), async (req, res) => {
  let name = req.body.name;
  let description = req.body.description;
  let author = req.body.author;
  let buffile = fs.readFileSync(req.files[0].path);
  ipfs.add(buffile).then((fileinfo) => {
    console.log(fileinfo.path);
    createProduct(name, description, author, fileinfo.path)
      .then((result) => {
        res.json({ data: result });
      })
      .catch((err) => {
        res.json({ data: "failed to add" });
      });
  });
  console.log(req.body);
  console.log(req.files[0].path);
});

router.get("/getAllProduct", (req, res) => {
  findAllproduct()
    .then((result) => {
      res.json({ data: result });
    })
    .catch((err) => {
      res.json({ data: "no such item" });
    });
});

router.get("/getProductById/:id", (req, res) => {
  let productId = req.params.id;
  console.log(productId);
  getProductById(productId)
    .then((result) => {
      res.json({ data: result });
    })
    .catch((err) => {
      res.json({ data: "no such item" });
    });
});

router.get("/getProductByUser/:id", (req, res) => {
  let userId = req.params.id;
  console.log(userId);
  getProductByUser(userId)
    .then((result) => {
      res.json({ data: result });
    })
    .catch((err) => {
      res.json({ data: "no such item" });
    });
});

router.get("/search", (req, res) => {
  let search = req.query.search;
  console.log(search);
  getProductSearch(search)
    .then((result) => {
      res.json({ data: result });
    })
    .catch((err) => {
      res.json({ data: "no such item" });
    });
});

export default router;
