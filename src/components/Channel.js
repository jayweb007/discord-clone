import React from "react";
import { HashtagIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setChannelInfo } from "../features/channelSlice";

function Channel({ id, channelName }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const setChannel = () => {
    dispatch(
      setChannelInfo({
        channelId: id,
        channelName: channelName,
      })
    );

    history.push(`/channels/${id}`);
  };

  return (
    <div
      className="flex font-medium cursor-pointer 
    p-1 rounded-md hover:text-white hover:bg-discord_channelsHoverBg"
      onClick={setChannel}
    >
      <HashtagIcon className="h-5 mr-2" /> {channelName}
    </div>
  );
}

export default Channel;
