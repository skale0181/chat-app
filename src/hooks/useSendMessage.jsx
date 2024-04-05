import { useState } from "react";
import useConversation from "../zostandStore/useConversation";
import globalRequest from "../prototype/globalRequest";
import { API_ROUTES } from "../common/ApiRoutes";
import toast from "react-hot-toast";

export const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    let data = {
      message,
    };
    try {
      //api call to send message
      const res = await globalRequest(
        API_ROUTES?.SEND_MESSAGE(selectedConversation?._id),
        "post",
        data,
        {}
      );
      setMessages([...messages, res?.newMessage]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message")
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
