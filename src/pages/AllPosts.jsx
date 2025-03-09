import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components/index'
function AllPosts() {
    const [post, setPost] = useState([])
    useEffect(() => {}, [])
    appwriteService
    .getAllPosts([])
    .then((posts) => {
        if(posts){
            setPost(posts.documents)
        }
    })
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {
                    post.map((post) => (
                        <div className='p-2 w-1' key={post.$id}>
                            <PostCard post={post}/>
                        </div>
                    ))
                }
            </div>
            
        </Container>
    </div>
  )
}

export default AllPosts