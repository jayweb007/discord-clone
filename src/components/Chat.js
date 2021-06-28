import React from "react";
import {
  BellIcon,
  HashtagIcon,
  ChatIcon,
  UsersIcon,
  SearchIcon,
  InboxIcon,
  QuestionMarkCircleIcon,
  PlusCircleIcon,
  GiftIcon,
  EmojiHappyIcon,
} from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { selectChannelName, selectChannelId } from "../features/channelSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useRef } from "react";
import firebase from "firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";

function Chat() {
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [user] = useAuthState(auth);
  const inputRef = useRef("");
  const chatRef = useRef(null);
  const [messages] = useCollection(
    channelId &&
      db
        .collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  //
  // function to scroll to bottom of input chat
  const scrollToBottom = () => {
    chatRef.current.scrollIntoView({
      behaviour: "smooth",
      block: "start",
    });
  };

  //
  // function to send chat
  const sendMessage = (e) => {
    e.preventDefault();

    if (inputRef.current.value !== "") {
      db.collection("channels").doc(channelId).collection("messages").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: inputRef.current.value,
        name: user?.displayName,
        photoURL: user?.photoURL,
        email: user?.email,
      });
    }

    inputRef.current.value = "";
    scrollToBottom();
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header  */}
      <header
        className="flex items-center justify-between space-x-5 border-b
      border-gray-800 p-4 -mt-1"
      >
        <div className="flex items-center space-x-1">
          <HashtagIcon className="h-6 text-discord_chatHeaderIcon " />
          <h4 className="text-gray-100 font-medium ">{channelName}</h4>
        </div>
        <div className="flex space-x-3">
          <BellIcon className="icon" />
          <ChatIcon className="icon" />
          <UsersIcon className="icon" />
          <div className="flex text-xs rounded-md bg-discord_serversBg p-1">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent placeholder-discord_chatHeaderIcon focus:outline-none ml-1 text-gray-100"
            />
            <SearchIcon className="h-4 ml-1 mr-1 text-discord_chatHeaderIcon " />
          </div>
          <InboxIcon className="icon" />
          <QuestionMarkCircleIcon className="icon" />
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-grow overflow-y-scroll scrollbar-hide ">
        {messages?.docs.map((doc) => {
          const { timestamp, message, name, photoURL, email } = doc.data();

          return (
            <Message
              key={doc.id}
              id={doc.id}
              timestamp={timestamp}
              message={message}
              name={name}
              photoURL={photoURL}
              email={email}
            />
          );
        })}

        <div ref={chatRef} className="pb-16" />
      </main>

      {/* Chat Input  */}
      <footer className="flex items-center mx-5 p-2.5 mb-7 rounded-lg bg-discord_chatInputBg ">
        <PlusCircleIcon className="icon mr-4" />
        <form className="flex-grow">
          <input
            type="text"
            disabled={!channelId}
            placeholder={
              channelId ? `Message #${channelName}` : "Select a Channel"
            }
            className="bg-transparent placeholder-discord_chatHeaderIcon 
            focus:outline-none text-gray-400 w-full text-sm"
            ref={inputRef}
          />
          <button hidden type="submit" onClick={sendMessage}>
            Send
          </button>
        </form>
        <GiftIcon className="icon mr-2" />
        <EmojiHappyIcon className="icon" />
      </footer>
    </div>
  );
}

export default Chat;
