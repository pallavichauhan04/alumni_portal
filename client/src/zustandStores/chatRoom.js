import { create } from 'zustand'

export const chatStore = create((set) => ({
    username: "",
    room: "",
    showChat: "",
    setUsername: async (name) => {
        
        set({ username: name });
    },
    setRoom: async (room) => {
        
        set({ room: room });
    },
    setShowChat: async (chat) => {
        
        set({ showChat: chat});
    },

    

}))

