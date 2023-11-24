import React from 'react'
import Post from '../ReactFunctionComponents/post/Post.js'
import {useFetch} from '../hooks/useFetch.js'
export default function Home() {
const {data:posts,error,isPending} = useFetch("https://jsonplaceholder.typicode.com/posts")
    return (
        <div className="pt-5">
            {
                posts && posts.map((post) => {
                    return <Post post={post} key={post.id} />
                })
            }
            {
                error && <h3>{error}</h3>
            }
            {
                isPending &&<h3>Loading....</h3>
            }
        </div>
    );
}


