import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import useConversation from "../../zostandStore/useConversation";
import { useGetConversations } from "../../hooks/useGetConversations";

export const SearchInput = () => {
  const [search, setSearch] = useState("");
  const {setSelectedConversation} = useConversation();
  const {conversations} = useGetConversations(); 



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
    if(!search) return;
    // search user
    searchUser(search);
  };

  //search functionality
  const searchUser = (search) => {
    const user = conversations.find((conversation) => conversation.fullName.toLowerCase().includes(search.toLowerCase()));
    if(user){
      setSelectedConversation(user);
      setSearch("");//make search input empty
    }else{
      //user not found
    }
  }
  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        className="input input-bordered rounded-full"
        placeholder="Search user.."
        value={search}
        onChange={(e) => setSearch(e.target.value.trimStart())}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <SearchIcon/>
      </button>
    </form>
  );
};
