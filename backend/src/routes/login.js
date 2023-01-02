import User from "../models/user";
import express, { Router } from "express";
import { ObjectId } from "mongoose";
const router = Router();
router.use(express.json());
const createUser = async (newName, newEmail, newPassword) => {
  let findResult = await User.find({ email: newEmail });
  console.log(findResult);
  if (findResult.length == 0) {
    let newuser = new User({
      username: newName,
      email: newEmail,
      password: newPassword,
    });
    let result = await newuser.save();
  }
  return findResult;
};

const FindUser = async (email, password) => {
  let result = await User.find(
    { email: email, password: password },
    "email ,_id, username"
  );
  console.log(result);
  return result;
};

router.post("/register", (req, res) => {
  let Uname = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  console.log(req.body);
  createUser(Uname, email, password)
    .then((result) => {
      if (result.length == 0) {
        res.json({ data: "success" });
      } else {
        res.json({ data: "failed" });
      }
    })
    .catch((err) => {
      res.json({ data: "Failed" });
    });
});

router.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  console.log(email);
  FindUser(email, password)
    .then((result) => {
      console.log(result.length);
      if (result.length == 0) {
        res.json({ data: "failed" });
      } else {
        res.json({ status: "success", result });
      }
    })
    .catch((err) => {
      res.json({ data: "failed" });
    });
});
export default router;
