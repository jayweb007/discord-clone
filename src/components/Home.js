import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { Redirect } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  ChevronDownIcon,
  MicrophoneIcon,
  PhoneIcon,
  PlusIcon,
  CogIcon,
} from "@heroicons/react/solid";
import Channel from "./Channel";
import ServerIcon from "./ServerIcon";
import Chat from "./Chat";

function Home() {
  const [user] = useAuthState(auth);
  const [channels] = useCollection(db.collection("channels"));

  //Add channel to Firestore DB
  const addChannel = () => {
    const channelName = prompt("Enter a New Channel Name");

    if (channelName != null) {
      db.collection("channels").add({
        channelName: channelName,
      });
      // .catch((error) => error.message);
    }
  };

  return (
    <>
      {!user && <Redirect to="/" />}
      <div className="flex h-screen">
        {/* Logo Section */}
        <div className="flex flex-col space-y-3 bg-discord_serversBg p-3 min-w-max">
          <div className="server-default hover:bg-discord_purple ">
            <img src="https://rb.gy/kuaslg" alt="" className="h-5" />
          </div>
          <hr className="border border-gray-700 w-8 mx-auto" />
          <ServerIcon image="/images/user2.jpeg" />
          <ServerIcon image="/images/user.png" />
          <ServerIcon image="/images/user2.jpeg" />
          <ServerIcon image="/images/user.png" />

          <div className="server-default hover:bg-discord_green hover:rounded-2xl group">
            <PlusIcon
              className="text-discord_green h-7 
            group-hover:text-white "
            />
          </div>
        </div>

        {/* Channel Section */}
        <div className="flex flex-col bg-discord_channelsBg min-w-max">
          <h2
            className="flex justify-between items-center text-gray-100 font-bold cursor-pointer
          text-sm p-4 border-b border-gray-800 hover:bg-discord_serverNameHoverBg"
          >
            Official Coding Server... <ChevronDownIcon className="h-5 ml-2" />{" "}
          </h2>

          <div
            className="text-discord_channel flex-grow overflow-y-scroll
          scrollbar-hide "
          >
            <div className="flex items-center p-2 mb-2">
              <ChevronDownIcon className="h-3 mr-2" />
              <h4 className="font-semibold">Channels</h4>
              <PlusIcon
                onClick={addChannel}
                className="h-6 ml-auto cursor-pointer hover:text-white"
              />
            </div>

            <div className="flex flex-col space-y-2 px-2 mb-4 ">
              {channels?.docs.map((doc) => (
                <Channel
                  key={doc.id}
                  id={doc.id}
                  channelName={doc.data().channelName}
                />
              ))}
            </div>
          </div>
          <div
            className="bg-discord_userSectionBg p-2 flex 
          space-x-8 items-center justify-between "
          >
            <div className="flex items-center space-x-1">
              <img
                src={user?.photoURL}
                alt={user?.displayName}
                className="h-10 rounded-full cursor-pointer"
                onClick={() => auth.signOut()}
              />
              <h4 className="text-white text-xs font medium">
                {user?.displayName}
                <span className="text-discord_userId block">
                  #{user?.uid.substring(0, 4)}
                </span>
              </h4>
            </div>
            <div className="flex text-gray-400 items-center ">
              <div className="icon-box">
                <MicrophoneIcon className="icon" />
              </div>
              <div className="icon-box">
                <PhoneIcon className="icon" />
              </div>
              <div className="icon-box">
                <CogIcon className="icon" />
              </div>
            </div>
          </div>
        </div>

        {/* Chat Section          */}

        <div className=" flex-grow bg-discord_serverbg">
          <Chat />
        </div>
      </div>
    </>
  );
}

export default Home;
