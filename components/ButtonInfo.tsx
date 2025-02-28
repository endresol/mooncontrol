"use client";
import { useState } from "react";

export default function ButtonInfo() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <span
        className="uppercase text-s border-2 border-bison-200 text-bison-300 rounded-xl py-1 px-2 hover:bg-bison-200 hover:text-bison-500 text-center cursor-pointer"
        onClick={() => setShowPopup(true)}
      >
        How it works!
      </span>
      {showPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowPopup(false)}
        >
          <div className="bg-white p-4 rounded-lg w-3/5 flex flex-col items-center justify-center overflow-hidden">
            <img
              src="/moon_ape_staking_infographic.png"
              alt="Popup Image"
              className="w-full h-full object-contain"
            />
            <button
              className="mt-2 px-4 py-2 bg-bison-200 text-bison-500 rounded"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
