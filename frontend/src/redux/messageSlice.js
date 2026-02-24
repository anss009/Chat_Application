import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "message",
    initialState: {
        messages: null,
    },
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        addMessage: (state, action) => {
            state.messages = state.messages ? [...state.messages, action.payload] : [action.payload];
        }
    }
});

export const { setMessages, addMessage } = messageSlice.actions;
export default messageSlice.reducer;
