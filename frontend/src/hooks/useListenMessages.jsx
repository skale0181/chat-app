import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zostandStore/useConversation";
import notificationSound from "../assets/sound/notification.mp3"

export const useListenMessages = () => {
  const { onlineUsers, socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
        newMessage.shouldShake = true; // added for shake message when come from any user
        const sound = new Audio(notificationSound)
        sound.play();
      setMessages([...messages, newMessage]);
    });

    return () => socket.off("newMessage");
  }, [socket, messages]);
};
