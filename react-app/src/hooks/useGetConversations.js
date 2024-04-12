import { useEffect, useState } from "react";
import axios from "axios";
// import toast from "react-hot-toast";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const chatUser = JSON.parse(localStorage.getItem('chat-user'));
                const token = chatUser.token;
                // console.log(chatUser)
                // console.log(token);
                const response = await axios.get("http://localhost:8090/api/users", {
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
                
                
                setConversations(data);
            } catch (error) {
                // toast.error(error.message);
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, []);

    return { loading, conversations };
};

export default useGetConversations;
