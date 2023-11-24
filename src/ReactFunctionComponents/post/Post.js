import React from "react";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../hooks/useThemeContext";

export default function Post({ post }) {
    const navigate = useNavigate()
const {theme} = useThemeContext()
    const handleClick =()=>{
navigate(`post/${post.id}`,{state:post})
    }
    return (
        <div className={`flex flex-wrap flex-col text-left pl-24 pb-5 ${theme==="dark"?"bg-blue-200":"bg-red-200"}`} onClick={handleClick}>
            <div className={`p-4 border-2 ${theme==="dark"?"border-blue-500":"border-red-500"}`}>
                <h1 className="font-bold text-lg">{post.title}</h1>
            </div>
            <div className={`p-4 border-2 ${theme==="dark"?"border-blue-500":"border-red-500"}`}>
                <p>{post.body}</p>
            </div>
        </div>
    );
}

;