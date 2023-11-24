import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Submitbutton from "../../ReactFunctionComponents/submitButton/Submitbutton";

export default function CreatePost() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [validationError, setValidationError] = useState("")
    const navigate = useNavigate()
    const { data, error, optionsData } = useFetch('https://jsonplaceholder.typicode.com/posts', 'POST')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title) {
            setValidationError("Title Should Not Be Empty")
            return
        }
        if (!content) {
            setValidationError("Content Should Not Be Empty")
            return
        }
        setValidationError("")
        optionsData({ title, body: content, userId: 1 })
    }
    useEffect(() => {
        if (data.length !== 0) {
            const timer = setTimeout(() => navigate("/"), 2000);
            return () => { clearTimeout(timer) }
        }
    }, [data, navigate])
    return (
        <div className="flex flex-wrap flex-col gap-5 pb-2 pl-10">
            {
                data.length !== 0 && <div className="bg-green-500 text-white h-10 flex text-center justify-center items-center" role="alert">Post Created Successfully</div>
            }
            {
                error && <div className="bg-red-500 text-white h-10 flex text-center justify-center items-center" role="alert">{error}</div>
            }
            {
                validationError && <div className="bg-red-500 text-white h-10 flex text-center justify-center items-center" role="alert">{validationError}</div>
            }
            <form onSubmit={handleSubmit}>
                <div className="flex gap-1 flex-col text-left ">
                    <div>
                        <label><b className="text-xl">Title</b></label>
                    </div>
                    <div className="pr-10">
                        <input type="text" className="w-full  border-2 border-black" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                    </div>
                </div>
                <div className="flex gap-1 flex-col text-left">
                    <div>
                        <label><b className="text-xl">Content</b></label>
                    </div>
                    <div className="pr-10">
                        <textarea className="w-full  border-2 border-black" value={content} onChange={(e) => { setContent(e.target.value) }} />
                    </div>
                </div>
                <div className="flex items-end justify-end pr-10">
                    <Submitbutton title="Create" />
                </div>
            </form>
        </div>
    );
}
