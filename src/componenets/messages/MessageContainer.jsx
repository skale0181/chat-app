import React, { useEffect } from "react";
import { Messages } from "./Messages";
import { MessageInput } from "./MessageInput";
import ForumTwoToneIcon from "@mui/icons-material/ForumTwoTone";
import useConversation from "../../zostandStore/useConversation";

export const MessageContainer = () => {
  //get selected conversation from global store
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => {
      // cleanup function to reset selected conversation
      setSelectedConversation(null);
    };
  }, []);

  return (
    <>
      {!selectedConversation ? (
        <div className="md:min-w-[450px]">
          {" "}
          <NoChatSelected />
        </div>
      ) : (
        <div className="md:min-w-[450px] flex flex-col">
          <>
            {/*Header  */}
            <div className="flex gap-2 items-center p-2 bg-gray-500">
              {" "}
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="profile-img"
                    src={
                      selectedConversation?.profilePic
                        ? selectedConversation?.profilePic
                        : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    }
                  />
                </div>
              </div>{" "}
              <span className="text-gray-900 font-bold">
                {" "}
                {selectedConversation?.fullName}{" "}
              </span>
            </div>

            {/* messages */}
            <Messages />
          </>

          <MessageInput />
        </div>
      )}
    </>
  );
};

export const NoChatSelected = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text center sm:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 // user // </p>
        <p>select a chat to start messaging </p>
        <ForumTwoToneIcon style={{ fontSize: 80 }} />
      </div>
    </div>
  );
};
