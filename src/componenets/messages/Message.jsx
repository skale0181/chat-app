import React, { useEffect, useRef } from "react";
import { formatDateFunction, isSameDate } from "../../common/HelperFunctions";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zostandStore/useConversation";

export const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const isSender = message?.senderId === authUser?._id;
  //set the image of the sender
  const useImg = isSender
    ? authUser?.profilePic
    : selectedConversation?.profilePic;

  // Scroll to the end of the conversation
  const chatEndRef = useRef(null);
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const isToday = isSameDate(message?.createdAt)

  return (
    <div className={`chat chat-${isSender ? "end" : "start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={
              useImg
                ? useImg
                : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            }
          />
        </div>
      </div>
      <div
        className={`chat-bubble ${
          isSender ? "bg-blue-500" : "bg-gray-500"
        } text-white`}
      >
        {message?.message}
      </div>
      <div className="chat-footer opacity-50 text-white">
        {formatDateFunction(message?.createdAt,"dd/mm/yyyy", true, isToday)}
      </div>
      {/* Empty div to scroll to */}
      <div ref={chatEndRef} />
    </div>
  );
};
