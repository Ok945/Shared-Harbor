
import User from '../models/user.models.js'
import Product from '../models/product.models.js'
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req, res) => {

    try {

        const { fname, lname, email, mis, password, cpassword } = req.body;

        // console.log(fname)

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {

            return res.status(409).json({ error: "User already exists" });
        }
        else {

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt)

            const newUser = new User({
                fname,
                lname,
                email,
                mis,
                password: hashedPassword
            })

            const token = await generateTokenAndSetCookie(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fname: newUser.fname,
                lname: newUser.lname,
                email: newUser.email,
                mis: newUser.mis,
                token: token

            });
        }

    } catch (error) {
        console.error("Error signing up user:", error);
        res.status(500).json({ error: "An error occurred while signing up user" });
    }
}








export const login = async (req, res) => {
    try {
        const isUser = await User.findOne({ email: req.body.email });

        if (isUser) {

            const isPasswordCorrect = await bcrypt.compare(req.body.password, isUser?.password || "")
            if (isPasswordCorrect) {


                const token = await generateTokenAndSetCookie(isUser._id, res)

                res.status(201).json({
                    _id: isUser._id,
                    fname: isUser.fname,
                    lname: isUser.lname,
                    email: isUser.email,
                    mis: isUser.mis,
                    token: token

                });
            }
            else {
                return res.status(409).json({ error: "Wrong Password " });
            }

        } else {
            return res.status(422).json({ error: "User not exists" });
        }

    } catch (error) {
        console.error("Error loging in user:", error);
        res.status(500).json({ error: "An error occurred while loging in user" });
    }
}


export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};




export const addProduct = (req, res) => {

    const name = req.body.name;
    const category = req.body.category;
    const description = req.body.description;
    const price = req.body.price;
    const image = req.file.path;
    const userID = req.body.userId;



    const productData = new Product({ name, description, category, price, image, userID });
    console.log(productData);
    productData.save()
        .then(() => {
            console.log("done")
            res.send({ message: 'saved success' })
        })
        .catch(() => {
            res.send({ message: 'server error' })
        })

}




// app.post('/addProduct', upload.single('image'), async (req, res) => {

//

//

// })