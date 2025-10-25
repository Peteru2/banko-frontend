import { useState, useContext, createContext, useEffect } from "react";

const ThemeContext = createContext()

export const useTheme = () => useContext(ThemeContext)
export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState("light")
useEffect(()=>{
    const storedTheme = localStorage.getItem("theme")
    if (storedTheme) {
        setTheme(storedTheme)
        document.documentElement.classList.add(storedTheme)
    }
    else{
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(prefersDark ? "dark" : "light");
        document.documentElement.classList.add(prefersDark ? "dark" : "light");
    }
}, [])

const toggleTheme = () =>{
    const newTheme = theme === "light"? "dark":"light"
    setTheme(newTheme);

    document.documentElement.classList.remove(theme)
    document.documentElement.classList.add(newTheme)
    localStorage.setItem(newTheme)
}
return(
    <ThemeContext.Provider value = {{theme, toggleTheme}}>
        {children}
    </ThemeContext.Provider>
)
}