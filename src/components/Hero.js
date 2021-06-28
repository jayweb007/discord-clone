import React from "react";
import { DownloadIcon } from "@heroicons/react/outline";

function Hero() {
  return (
    <div className="bg-discord_blue pb-8 md:pb-0">
      <div className="p-7 py-9 h-screen md:h-vh83 md:flex relative">
        <div className="flex flex-col gap-7 md:max-w-md lg:max-w-none lg:justify-center">
          <h1 className="text-white text-5xl font-bold ">Your place to talk</h1>
          <h2 className="text-white text-lg font-thin tracking-wide lg:max-w-3xl w-full ">
            Whether you’re part of a school club, gaming group, worldwide art
            community, or just a handful of friends that want to spend time
            together, Discord makes it easy to talk every day and hang out more
            often.
          </h2>
          <div
            className="flex flex-col gap-6 items-center sm:flex-row 
            md:flex-col lg:flex-row md:items-start sm:items-center "
          >
            <button
              className="flex items-center justify-center bg-white font-semibold 
            text-sm text-black p-4 tracking-wide rounded-full w-60 hover:shadow-2xl
            hover:text-discord_blurple focus:outline-none transition duration-200 ease-in-out"
            >
              <DownloadIcon className="w-5 mr-2" /> Download for Mac
            </button>
            <button
              className="flex items-center justify-center bg-gray-900 
              font-medium text-white text-sm p-4 rounded-full w-72 
              hover:shadow-2xl hover:bg-gray-800 focus:outline-none 
              transition duration-200 ease-in-out"
            >
              Open Discord in your browser
            </button>
          </div>
        </div>
        <div className="flex-grow">
          <img
            src="/images/home_2.svg"
            alt=""
            className="absolute -left-36 mt-16 sm:-left-44 md:hidden "
          />
          <img
            src="/images/home_1.svg"
            alt=""
            className="hidden md:inline absolute"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
