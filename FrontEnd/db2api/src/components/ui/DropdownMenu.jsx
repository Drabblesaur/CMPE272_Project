import React, { createContext, useContext, useState } from "react";

// Context for managing dropdown state
const DropdownContext = createContext();

export const DropdownMenu = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div className="relative">{children}</div>
    </DropdownContext.Provider>
  );
};

export const DropdownMenuTrigger = ({ children, asChild }) => {
  const { setOpen } = useContext(DropdownContext);

  return (
    <button
      type="button"
      onClick={() => setOpen((prev) => !prev)}
      className="inline-flex items-center justify-center rounded-md text-sm border px-4 py-2"
    >
      {children}
    </button>
  );
};

export const DropdownMenuContent = ({ children }) => {
  const { open } = useContext(DropdownContext);

  return (
    open && (
      <div className="absolute mt-2 w-48 bg-white border rounded shadow-lg">
        {children}
      </div>
    )
  );
};

export const DropdownMenuItem = ({ children, onClick }) => {
  return (
    <div
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
};