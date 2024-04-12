import express from 'express';
import { getOneProduct, getProducts, addProduct, getOwner, adminProduct  } from '../controller/product.controller.js';

import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();

import multer from 'multer';




// console.log("hi0")



// Multer disk storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'node-app/uploads'); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        // Customize the filename (e.g., adding a timestamp)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = file.originalname.split('.').pop();
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
    }
});

const upload = multer({ storage: storage });

// console.log("hi1")


router.get("/", protectRoute, getProducts); // Route to fetch all products
router.get("/:id", getOneProduct); // Route to fetch a single product by ID
router.post("/addProduct", upload.single('image'), protectRoute, addProduct);
router.get("/owner/:id", getOwner);
router.get("/admin/:id", protectRoute, adminProduct)

export default router;