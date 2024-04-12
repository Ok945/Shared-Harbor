import React from 'react'
import useGetConversations from "../hooks/useGetConversations";
import Conversation from "./Conversation";
import MessageContainer from './messageAdmin/MessageContainer';

import useConversation from '../zustand/useConversation';

import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
const AdminProductPage = () => {

    const { loading, conversations } = useGetConversations();

    const { selectedProduct, setSelectedProduct } = useConversation();


    const { productId } = useParams();







    useEffect(() => {
        //     const fetchInterestedUsers = async () => {
        //         try {
        //             const chatUser = JSON.parse(localStorage.getItem('chat-user'));
        //             const token = chatUser.token;
        //             const res = await axios.get(`http://localhost:8090/api/products/getinteresteduser/${productId}`, {
        //                 headers: {
        //                     'Authorization': `Bearer ${token}`,
        //                     'Content-Type': 'application/json',
        //                 },
        //             });
        //             console.log(res.data);
        //         } catch (error) {
        //             console.log('Error fetching interested users:', error);
        //         }
        //     };

        if (productId) {
            setSelectedProduct(productId);
        }
    }, []);

    // console.log(conversations);
    // console.log(productId);






    return (
        <div className='py-2 flex overflow-auto h-screen '>
            <div>
                {conversations && conversations.length > 0 && (conversations.map((conversation, idx) => (
                    <Conversation
                        key={conversation._id}
                        conversation={conversation}
                        lastIdx={idx === conversations.length - 1}
                    />
                )))}
            </div>
            <div>
                {<MessageContainer />}
            </div>
            {loading ? <span className='loading loading-spinner mx-auto'></span> : null}

        </div>
    )
}

export default AdminProductPage
