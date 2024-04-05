import { useEffect, useState } from "react";
import useConversation from "../zostandStore/useConversation";
import globalRequest from "../prototype/globalRequest";
import { API_ROUTES } from "../common/ApiRoutes";

export const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const getMessages = async (id) => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await globalRequest(
        API_ROUTES?.GET_MESSAGES(id),
        "get",
        {},
        {}
      );
      setMessages(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMessages(selectedConversation?._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConversation?._id, setMessages]);

  return { loading, messages };
};
