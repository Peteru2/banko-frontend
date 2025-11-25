import React from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={"w-10 h-10 rounded-full border border-black dark:border-white hover:bg-gray-200 dark:hover:bg-gray-800 transition"}
    >
      {theme === "light" ? (
        <i className="fa fa-moon  text-gray-800"> </i>
      ) : (
        <i className=" fa fa-sun text-white"></i>
      )}
    </button>
  );
};

export default ThemeToggle;
