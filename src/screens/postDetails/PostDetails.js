import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import Submitbutton from "../../ReactFunctionComponents/submitButton/Submitbutton";


export default function PostDetails() {

    const location = useLocation()
    const { state: post } = location
    const { data, error, optionsData } = useFetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, "DELETE")

    const navigate = useNavigate()
    const handleEdit = () => {
        navigate(`/edit/${post.id}`, { state: post })
    }
    const handleDelete = () => {
        optionsData()
    }
    useEffect(() => {
        if (data.length !== 0) {
            const timer = setTimeout(() => navigate("/"), 3000);
            return () => { clearTimeout(timer) }
        }
    }, [data, navigate])

    return (
        <div className='flex flex-wrap flex-col text-left pl-24 pb-5'>
            {
                data.length !== 0 && <div className="bg-red-500 text-white h-10 flex text-center justify-center items-center" role="alert">Post Deleted Successfully</div>
            }
            {
                error && <div className="bg-red-500 text-white h-10 flex text-center justify-center items-center" role="alert">{error}</div>
            }
            <   div className="p-4 border-4 bg-slate-300">
                <h1 className="font-bold text-lg">{post.title}</h1>
            </div>
            <div className="p-4 border-4 bg-slate-300">
                <p>{post.body}</p>
            </div>
            <div className='flex gap-4 pt-4 pr-16 justify-end'>
            <Submitbutton onclick={handleDelete} title="Delete"/>
            <Submitbutton onclick={handleEdit} title="Edit"/>
            </div>
        </div>
    )
}
