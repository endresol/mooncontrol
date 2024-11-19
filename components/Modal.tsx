import React from "react";

type proprtypes = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<proprtypes> = ({ open, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors bg-bison-500/20 ${
        open ? " visible " : "invisible"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white text-bison-800  shadow p-2 transition-all max-w-4xl rounded-2xl border-2 border-white
      ${open ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 py-1 px-2 text-bison-800 hover:text-bison-300 text-2xl"
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
