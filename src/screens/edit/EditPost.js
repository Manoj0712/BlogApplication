import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import Submitbutton from "../../ReactFunctionComponents/submitButton/Submitbutton";


export default function EditPost() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [validationError, setValidationError] = useState("")
    const [modifiedField, setModifiedField] = useState({})

    const navigate = useNavigate()
    const location = useLocation()
    const { state: post } = location
    const { data, error, optionsData } = useFetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, "PATCH")


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
        optionsData(modifiedField)
    }
    useEffect(() => {
        setTitle(post.title)
        setContent(post.body)
        if (data.length !== 0) {
            const timer = setTimeout(() => navigate("/"), 3000);
            return () => { clearTimeout(timer) }
        }
    }, [data, navigate, post.title, post.body])

    const onTitleChange = (e) => {
        setTitle(e.target.value)
        setModifiedField({ ...modifiedField, title: e.target.value })
    }
    const onContentChange = (e) => {
        setContent(e.target.value)
        setModifiedField({ ...modifiedField, body: e.target.value })
    }

    return (
        <div className="flex flex-wrap flex-col gap-5 pb-2 pl-10">
            {
                data.length !== 0 && <div className="bg-green-500 text-white h-10 flex text-center justify-center items-center" role="alert">Post Edited Successfully</div>
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
                        <input type="text" className="w-full  border-2 border-black" value={title} onChange={onTitleChange} />
                    </div>
                </div>
                <div className="flex gap-1 flex-col text-left">
                    <div>
                        <label><b className="text-xl">Content</b></label>
                    </div>
                    <div className="pr-10">
                        <textarea rows="5" className="w-full  border-2 border-black" value={content} onChange={onContentChange} />
                    </div>
                </div>
                <div className="flex items-end justify-end pr-10">
                    <Submitbutton title="Submit" />
                </div>
            </form>
        </div>
    );
}