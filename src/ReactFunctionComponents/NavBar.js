import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useThemeContext } from "../hooks/useThemeContext";
function NavBar() {
 const {theme} = useThemeContext()

    const [headerScroll, setHeaderScroll] = useState(true)
    let prevScrollPos = window.pageYOffset;
    window.addEventListener("scroll", () => {
        const currentScrollPos = window.pageYOffset;
        if (prevScrollPos > currentScrollPos) {
            setHeaderScroll(true)
        } else {
            setHeaderScroll(false)
        }
        prevScrollPos = currentScrollPos;
    })
    console.log(theme,"theme")
    return (
        <div className={`${headerScroll ? "sticky top-0 w-full" : ""} ${theme==="dark"?"bg-blue-500":"bg-red-500"}`}>
            <header className="flex h-14 flex-warp justify-between items-center">
                <div className="pl-10">
                    <Link to="/"><h1 className="font-bold text-lg">BLOG</h1></Link>
                </div>
                <div className="pr-10">
                    <nav className="flex flex-wrap space-x-10">
                        <Link to="/"><h4>Home</h4></Link>
                        <Link to="/create"><h4>Create Post</h4></Link>
                    </nav>
                </div>

            </header>
        </div>
    );
}

export default NavBar;