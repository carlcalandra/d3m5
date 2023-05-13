import { createContext } from "react";
const themes = {
    light: {
      foreground: "#000000",
      background: "#ffffff"
    },
    dark: {
      foreground: "#ffffff",
      background: "#222222"
    }
  };


const ThemeContext = createContext();

export default ThemeContext;
export {themes};