import React from "react";
import { Message } from "./Message";
import { useGetMessages } from "../../hooks/useGetMessages";
import { ChatMessageSkeleton } from "../skeletons/ChatMessageSkeleton";
import { useListenMessages } from "../../hooks/useListenMessages";

export const Messages = () => {
  const { loading, messages } = useGetMessages();
  useListenMessages();
  return (
    <div className="px-4 flex-1 overflow-auto">
      {/* <Message/> */}
      {!loading &&
        messages.map((message) => (
          <Message key={message._id} message={message} />
        ))}
      {/* loading */}
      {loading &&
        [...Array(5)].map((_, idx) => <ChatMessageSkeleton key={idx} />)}
      {/* start conversation empty */}
      {!loading && messages.length === 0 && (
        <div className="text-center text-gray-400">
          Send a message to start conversation
        </div>
      )}
    </div>
  );
};
