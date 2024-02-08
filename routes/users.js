import express from "express";
import passport from "passport";
import { check, validationResult } from "express-validator";
// import {calcHash, generateSalt} from "../ui/scrypt.js";
// import {PrismaClient} from "@prisma/client";

const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('ユーザーズ');
});

// router.get("/", (req, res, next) => {
//   if (!req.user) {
//     const err = new Error("unauthenticated");
//     err.status = 401;
//     throw err;
//   }
//   res.json({
//     message: "logged in"
//   });
// });

router.post("/login", passport.authenticate("local", {
  successReturnToOrRedirect: "/dashboard",
  failureRedirect: "/login",
  failWithError: true
}), (req, res, next) => {
  console.dir(req.session.id);
  res.json({ message: "OK!" });
});

router.post("/signup", [
  check("name").notEmpty().withMessage("ユーザーネームを入力してください"),
  check("pass").notEmpty().withMessage("パスワードを入力してください")
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.json({ message: "うい" });
});

router.get("/signup", (req, res, next) => {
  res.render("signup", { title: "Sign Up" });
});


router.get("/error", (req, res, next) => {
  res.status(401).json({ message: "エラーです" });
});

router.get("/logout", (req, res, next) => {
  res.logout((err) => {
    res.json({
      message: "logout"
    });
  });
});
export default router;