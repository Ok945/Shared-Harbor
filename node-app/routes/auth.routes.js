import express from "express";
import { signup, login, logout,addProduct } from "../controller/auth.controller.js"



const router = express.Router();



router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/addProduct" , addProduct);






export default router;