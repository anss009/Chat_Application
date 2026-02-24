import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../redux/messageSlice";

const useGetRealTimeMessages = () => {
    const { socket } = useSelector(store => store.socket);
    const { selectedUser } = useSelector(store => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!socket) {
            console.log("RealTimeHook: Waiting for socket connection...");
            return;
        }

        const handleNewMessage = (newMessage) => {
            console.log("RealTimeHook: NEW_SOCKET_MESSAGE ->", newMessage);
            console.log("RealTimeHook: Current selectedUser ID ->", selectedUser?._id);

            // Only add if it's from the person we are currently chatting with
            if (selectedUser?._id === newMessage.senderId) {
                dispatch(addMessage(newMessage));
                console.log("RealTimeHook: Message added to Redux successfully ✅");
            } else {
                console.log(`RealTimeHook: Message ignored. Sender (${newMessage.senderId}) does not match Selection (${selectedUser?._id})`);
            }
        };

        socket.on("newMessage", handleNewMessage);

        console.log("RealTimeHook: Socket listener ACTIVE for 'newMessage'");

        return () => {
            socket.off("newMessage", handleNewMessage);
            console.log("RealTimeHook: Socket listener CLEANED UP");
        };
    }, [socket, dispatch, selectedUser?._id]);
}
export default useGetRealTimeMessages;