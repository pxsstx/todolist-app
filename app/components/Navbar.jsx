'use client'

import React, { useEffect, useState } from 'react'
import { IoMdSunny, IoMdMoon } from "react-icons/io";

function Navbar() {

    const [theme, setTheme] = useState("light");

    useEffect(() => {
        // Check if localStorage is available
        if (typeof window !== 'undefined') {
            // Access localStorage only if it's available
            const storedTheme = localStorage.getItem("theme");
            setTheme(storedTheme ? storedTheme : "light");
            document.querySelector("html").setAttribute("data-theme", theme);
        }
    }, [theme]); // Run this effect only once on component mount

    // Function to toggle theme
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        // Update localStorage if available
        if (typeof window !== 'undefined') {
            localStorage.setItem("theme", newTheme);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center align-middle mt-10">
                <h1 className="text-4xl text-base-content">Task APP</h1>
                <div>
                    <button className="btn" onClick={toggleTheme}>
                        {theme == "light" ? <IoMdSunny size={20} /> : <IoMdMoon size={20} />}
                    </button>
                </div>
            </div>
            <div className="divider"></div>
        </div>
    )
}

export default Navbar