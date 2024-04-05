import { useEffect, useState } from "react";
import { API_ROUTES } from "../common/ApiRoutes";
import globalRequest from "../prototype/globalRequest";

export const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    const getConversations = async()=>{
        setLoading(true);
        try {
          const res = await globalRequest(
            API_ROUTES?.GET_CONVERSATIONS,
            "get",
            {},
            {},
          );
          setConversations(res);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
     getConversations();
    }, [])


    return {loading, conversations};

  };

