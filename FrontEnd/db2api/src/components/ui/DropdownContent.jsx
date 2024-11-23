import React, { useContext } from "react";
import { DropdownContext } from "./DropdownMenu";

const DropdownContent = ({ children }) => {
  const { open } = useContext(DropdownContext);

  return (
    open && (
      <div className="absolute mt-2 w-48 bg-white border rounded shadow-lg">
        {children}
      </div>
    )
  );
};

export default DropdownContent;