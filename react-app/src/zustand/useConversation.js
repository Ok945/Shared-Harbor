import { create } from 'zustand'

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages:[],
    setMessages: (messages) => set({messages}),
    selectedProduct : null,
    setSelectedProduct : (selectedProduct) => set({selectedProduct}),

}));

export default useConversation;