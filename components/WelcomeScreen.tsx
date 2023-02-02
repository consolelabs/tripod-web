import React from "react";

export const WelcomeScreen = ({ play }: { play: () => void }) => {
  return (
    <div className="flex justify-center items-start w-screen h-screen bg-welcome-horizontal bg-no-repeat bg-cover bg-center">
      <div className="py-20 flex flex-col items-center">
        <img className="px-5 h-16" src="/text.webp" alt="tripod text" />
        <button
          onClick={play}
          type="button"
          className="mt-10 bg-tripod-900 border border-tripod/80 text-3xl text-white font-bold rounded-md px-3 py-2"
        >
          PLAY
        </button>
      </div>
    </div>
  );
};
