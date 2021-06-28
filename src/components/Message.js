import moment from "moment";
import { TrashIcon } from "@heroicons/react/solid";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useSelector } from "react-redux";
import { selectChannelId } from "../features/channelSlice";

function Message({ id, timestamp, message, name, photoURL, email }) {
  const channelId = useSelector(selectChannelId);
  const [user] = useAuthState(auth);

  // //Function for deleting a message
  const deleteMessage = () => {
    db.collection("channels")
      .doc(channelId)
      .collection("messages")
      .doc(id)
      .delete();
  };

  return (
    <div className="flex items-center p-1 pl-5 my-5 mr-2 group hover:bg-discord_messageBg">
      <img
        src={photoURL}
        alt=""
        className="h-10 rounded-full cursor-pointer mr-3 hover:shadow-2xl "
      />
      <div className="flex flex-col">
        <h4 className="flex items-center space-x-2 font-medium">
          <span className="hover:underline text-gray-100 text-sm cursor-pointer">
            {name}
          </span>
          <span className="text-discord_chatHeaderIcon text-sm">
            {moment(timestamp?.toDate().getTime()).format("lll")}
          </span>
        </h4>
        <p className="text-sm text-discord_iconHover">{message}</p>
      </div>
      {user?.email === email && (
        <div
          className="p-1 ml-auto hover:bg-red-500 rounded-sm text-red-500 
        hover:text-gray-100 cursor-pointer"
          onClick={deleteMessage}
        >
          <TrashIcon className="h-5 opacity-0 group-hover:opacity-100" />
        </div>
      )}
    </div>
  );
}

export default Message;
