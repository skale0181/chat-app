import React, { useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useSendMessage } from "../../hooks/useSendMessage";
export const MessageInput = () => {
  const [message, setMessage] = useState("");
  //update messages
  const { loading, sendMessage } = useSendMessage();

  //handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent default form submission
    if (!message) return;
    await sendMessage(message);
    setMessage("");
    // Focus input after a short delay
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };

  const inputRef = useRef(null); // Create a ref for the input element
  useEffect(() => {
    // Focus the input element when the component mounts
    inputRef.current.focus();
  }, []);
  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          ref={inputRef} // Assign the ref to the input element
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          disabled={loading}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3  text-white"
        >
          {loading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <SendIcon />
          )}
        </button>
      </div>
    </form>
  );
};
