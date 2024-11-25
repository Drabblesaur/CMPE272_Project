import React, { useContext } from "react";
import { DropdownContext } from "./DropdownMenu";

const DropdownTrigger = ({ children }) => {
  const { setOpen } = useContext(DropdownContext);

  return (
    <button
      type="button"
      className="inline-flex items-center justify-center rounded-md text-sm border px-4 py-2"
      onClick={() => setOpen((prev) => !prev)}
    >
      {children}
    </button>
  );
};

export default DropdownTrigger;