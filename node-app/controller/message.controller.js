import Conversation from "../models/conversation.models.js"
import Message from "../models/message.models.js"

export const sendMessage = async (req, res) => {

    try {


        const { message, id, productId } = req.body;

        // const { message } = req.body;
        // const { id: receiverId } = req.params;
        const senderId = req.user._id;
        const receiverId = id;
        // console.log(message, id, senderId, productId);

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });



        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                productId: productId
            })
        }

        // console.log(conversation);

        const newMessage = new Message({
            senderId,
            recevierId: receiverId,
            message: message
        })

        if (newMessage) {
            // console.log(newMessage);
            conversation.messages.push(newMessage._id);
        }

        // console.log(newMessage);
        await Promise.all([conversation.save(), newMessage.save()])
        console.log("jj")

        res.status(201).json(newMessage);


    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }

}



export const getMessage = async (req, res) => {

    try {

        const senderId = req.user._id;

        const { productId, conversationId } = req.query;

        const userToChatId = conversationId;

        console.log("hi0", senderId, userToChatId, conversationId);

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
            productId: productId
        }).populate('messages');


        if (!conversation) {
            return res.status(200).json([]);
        }

        console.log("hi")

        res.status(200).json(conversation.messages);

    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }

}





export const getIntrestedUsers = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    try {
        const conversation = await Conversation.findOne({
            participants: userId,
            productId: id,
        }).populate('participants', 'firstName lastName');

        if (!conversation) {
            return res.status(404).json({ message: 'Conversation not found' });
        }

        res.status(200).json({ conversation });
    } catch (error) {
        console.error('Error finding conversation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};