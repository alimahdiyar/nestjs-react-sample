import React, { ReactNode } from "react";

const Modal = ({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose?: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg">
        <button className="absolute top-0 right-0 m-2" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
