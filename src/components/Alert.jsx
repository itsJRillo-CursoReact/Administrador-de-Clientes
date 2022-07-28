import React from "react";

const Alert = ({children}) => {
  return (
    <div className="text-center my-4 uppercase bg-red-800 font-bold p-3 text-white">
      {children}
    </div>
  );
};

export default Alert;
