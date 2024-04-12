import { useState } from "react";
import axios from "axios";
import useConversation from "../zustand/useConversation";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation, selectedProduct } = useConversation();
    const [error, setError] = useState(null);

    // console.log(selectedConversation, selectedProduct);
    const sendMessage = async (message) => {
        setLoading(true);
        try {
            const chatUser = JSON.parse(localStorage.getItem('chat-user'));
            const token = chatUser.token;

            const requestBody = {
                message,
                id: selectedConversation._id,
                productId: selectedProduct,
            };

            const response = await axios.post(
                'http://localhost:8090/api/messages/send',
                requestBody,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include JWT token in Authorization header
                        'Content-Type': 'application/json', // Assuming JSON content type
                    },
                }
            );

            const data = response.data;
            if (data.error) {
                throw new Error(data.error);
            }

            setMessages([...messages, data]);
        } catch (error) {
            // Handle error
            setError('Failed to send message. Please try again later.');
            console.error("Error sending message:", error);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading, error };
};

export default useSendMessage;
