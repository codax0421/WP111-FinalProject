import express, { Router } from "express";
import Product from "../models/product.js";
import User from "../models/user.js";
import Favourite from "../models/favourite.js";
import router from "./login.js";

const addFavourite = async (userid, productid) => {
  let findFavourite = await Favourite.find({
    user: { _id: userid },
    product: { _id: productid },
  });

  if (findFavourite.length == 0) {
    let newFavourite = new Favourite({
      user: userid,
      product: productid,
    });
    let result = await newFavourite.save();
    return result;
  } else {
    return [];
  }

  // console.log(result);
  // return result;
};

const getFavouriteByUserId = async (id) => {
  let getFavourite = await Favourite.find({ user: { _id: id } })
    .populate("product")
    .select("product");
  console.log("user favourite", getFavourite);
  return getFavourite;
};

const deleteFavourite = async (userid, productid) => {
  let deleteFav = await Favourite.remove({
    user: { _id: userid },
    product: { _id: productid },
  });
  console.log(deleteFav);
  return deleteFav;
};

router.post("/addFavourite", (req, res) => {
  let userid = req.body.user;
  let productid = req.body.product;

  addFavourite(userid, productid)
    .then((result) => {
      res.json({ data: result });
    })
    .catch((err) => {
      res.json({ data: "failed to add favourite" });
    });
});

router.get("/userFavourite/:id", (req, res) => {
  let userid = req.params.id;
  getFavouriteByUserId(userid)
    .then((result) => {
      res.json({ data: result });
    })
    .catch((err) => {
      res.json({ data: [] });
    });
});

router.post("/userDeleteFav", (req, res) => {
  let userid = req.body.user;
  let productid = req.body.product;
  console.log(userid, productid);
  deleteFavourite(userid, productid)
    .then((result) => {
      res.json({ data: result });
    })
    .catch((err) => {
      res.json({ data: "failed to delete" });
    });
});

export default router;
