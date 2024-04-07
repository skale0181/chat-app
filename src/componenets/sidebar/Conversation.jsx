import React from "react";
import useConversation from "../../zostandStore/useConversation";
import { useSocketContext } from "../../context/SocketContext";

export const Conversation = (props) => {
  const { name, profileImg, icon, lastIndex, user } = props;
  //for show selected conversation highlight
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user?._id; 
  const {onlineUsers} = useSocketContext(); //get online users from socket context 
  const isOnline = onlineUsers.includes(user?._id)
  return (
    <div>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => setSelectedConversation(user)}
      >
        <div className={`avatar ${isOnline? "online": ""}`}>
          <div className="w-12 rounded-full">
            <img
              src={
                profileImg
                  ? profileImg
                  : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              }
              alt="profile-img"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between ">
            <p className="font-bold text-gray-200">{name} </p>
            {/* <span>{icon ? icon : "😊"}</span> */}
          </div>
        </div>
      </div>
      {!lastIndex && <div className="divider my-0 py-0 h-1" />}
    </div>
  );
};
