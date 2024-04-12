import { useEffect, useState } from "react";
import axios from "axios";
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { messages, setMessages, selectedConversation, selectedProduct } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            try {
                const chatUser = JSON.parse(localStorage.getItem('chat-user'));
                const token = chatUser.token;

                const res = await axios.get(`http://localhost:8090/api/messages/?productId=${selectedProduct}&conversationId=${selectedConversation._id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (res.data && Array.isArray(res.data)) {
                    setMessages(res.data);
                } else {
                    setMessages([]);
                }
            } catch (error) {
                setError(error.message);
                console.error('Error fetching messages:', error);
            } finally {
                setLoading(false);
            }
        };

        // Only fetch messages if selectedConversation and selectedProduct are valid
        if (selectedConversation && selectedConversation && selectedProduct) {
            setLoading(true);
            setError(null); // Reset error state before fetching
            getMessages();
        }
    }, [selectedConversation, selectedProduct]);

    return { messages, loading, error };
};

export default useGetMessages;
