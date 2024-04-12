import Product from "../models/product.models.js";

import User from '../models/user.models.js'


export const addProduct = async (req, res) => {

    const name = req.body.name;
    const category = req.body.category;
    const description = req.body.description;
    const price = req.body.price;
    const userID = req.user._id;
    // console.log("h")


    const image = req.file.path;
    // console.log(image)

    const productData = new Product({ name, description, category, price, image, userID });
    // console.log(productData);

    productData.save()
        .then(() => {
            res.send({ message: 'saved success' })
        })
        .catch(() => {
            res.send({ message: 'server error' })
        })
}

export const getProducts = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming the authenticated user's ID is available in req.user._id
        const products = await Product.find({ userID: { $ne: userId } });

        res.status(200).json({ message: "Success", products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



export const adminProduct = async (req, res) => {
    try {
        const { id } = req.params;
        // console.log("jdj");
        // console.log(id);
        const products = await Product.find({ userID: id });

        res.status(200).json({ message: "Success", products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getOneProduct = async (req, res) => {
    const { id } = req.params; // Retrieve productId from request parameters
    try {
        const product = await Product.findById(id);
        if (!product) {
            console.log(product);
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Success', product });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const getOwner = async (req, res) => {
    const { id } = req.params;
    // console.log(id);

    try {
        // Find the user by ID in the User model
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract user's name from the user document
        const { fname, lname } = user;
        res.status(200).json({ fname, lname });
    } catch (error) {
        console.error('Error fetching owner:', error);
        res.status(500).json({ message: 'Server error' });
    }

}






