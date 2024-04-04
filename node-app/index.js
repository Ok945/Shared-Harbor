const express = require('express');
const port = 8080;
const mongoose = require('mongoose');
const bodyParaser = require('body-parser')
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
var ObjectID = require('mongodb').ObjectID;


const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
});

const upload = multer({ storage: storage })

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParaser.json());
app.use(bodyParaser.urlencoded({ extended: false }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




const uri = "mongodb+srv://Ok945:(Onlyf0rme!@cluster0.xixq3wq.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(uri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log("Connected to MongoDB successfully");
});

// Define MongoDB schema
const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  mis: String,
  password: String,
  cpassword: String
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  price: Number,
  image: String,
  userID: String // Reference to the User table
});




const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);

app.post('/signup', async (req, res) => {

  try {
    const newUser = new User(req.body);


    const existingUser = await User.findOne({ email: newUser.email });
    if (existingUser) {

      return res.status(409).json({ error: "User already exists" });
    }
    else {
      await newUser.save();
      res.status(201).json({ message: "User signed up successfully" });
    }

  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ error: "An error occurred while signing up user" });
  }


});







app.post('/login', async (req, res) => {

  try {
    const isUser = await User.findOne({ email: req.body.email });
    if (isUser) {
      if (isUser.password === req.body.password) {


        const token = jwt.sign({
          data: isUser
        }, 'mykey', { expiresIn: '1h' });


        res.status(201).json({ message: "User loged in successfully", token: token });
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
});




app.post('/addProduct', upload.single('image'), async (req, res) => {

  const name = req.body.name;
  const category = req.body.category;
  const description = req.body.description;
  const price = req.body.price;
  const image = req.file.path;
  const userID = req.body.userId;

  const productData = new Product({ name, description, category, price, image, userID });

  productData.save()
    .then(() => {
      res.send({ message: 'saved success' })
    })
    .catch(() => {
      res.send({ message: 'server error' })
    })

})



app.get('/getProduct', async (req, res) => {

  Product.find()
    .then((result) => {
      // console.log(result, "user data");
      res.send({ message: "success", products: result })
    })
    .catch((err) => {
      res.send({ message: "server error" })
    })

})




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
