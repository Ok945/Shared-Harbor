import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mis: {
        type: String,
        required: true,
        minlength: 9
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });




const User = mongoose.model('User', userSchema);


export default User;