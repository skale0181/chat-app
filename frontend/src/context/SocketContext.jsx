import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";

const SocketContext = createContext();

//hook for use socket context data
export const useSocketContext = ()=>{
  return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {

  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  //get usr from context 
  const {authUser} = useAuthContext();


  useEffect(()=>{
    //connect socket when user authenticated
    if(authUser){
      const socket = io("https://chat-app-production-v1.onrender.com", {
        query: {
          userId: authUser._id
        }
      });

      setSocket(socket);

      //socket.on() is used to listen to the events. from both client and server side 
      socket.on("getOnlineUsers", (users)=>{
        setOnlineUsers(users);
      })

      //for better performance close socket when unmount the component 
      return ()=>{
        socket.close();
      }
    }else{
      if(socket){
        socket.close();
        setSocket(null);
      }
    }
  },[authUser]);

  return <SocketContext.Provider value={{socket, onlineUsers}}>{children}</SocketContext.Provider>;
};
