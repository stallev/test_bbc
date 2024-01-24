import { useState } from "react";

const useDropdown = () => {
  const [activeDropdown, setActiveDropdown] = useState("");

  const handleMouseEnter = (label: any) => {
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    setActiveDropdown("");
  };

  const handleClick = (label: any) => {
    setActiveDropdown(activeDropdown === label ? "" : label);
  };

  return { activeDropdown, handleMouseEnter, handleMouseLeave, handleClick };
};

export default useDropdown;
