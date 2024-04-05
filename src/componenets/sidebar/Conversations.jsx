import React from "react";
import { Conversation } from "./Conversation";
import { useGetConversations } from "../../hooks/useGetConversations";

export const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <>
          {conversations.map((conversation, idx) => {
            return (
              <Conversation
                key={conversation._id}
                name={conversation.fullName}
                profileImg={conversation.profilePic}
                user={conversation}
                icon={conversation.icon}
                lastIndex={idx === conversation.lastMessage - 1}
              />
            );
          })}
        </>
      )}
    </div>
  );
};
