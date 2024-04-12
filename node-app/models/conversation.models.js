import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    productId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
        },
    ],
}, { timestamps: true });

// Register the Conversation model with Mongoose
const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;
