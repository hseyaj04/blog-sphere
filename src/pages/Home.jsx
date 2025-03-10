import React, { useEffect, useState } from 'react'
import {Container, PostCard} from '../components/index'
import appwriteService from '../appwrite/config'
function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getAllPosts().then((posts) => {
            if(posts){
                setPosts(posts.documents)
            }
        })
    })
  if(posts.length ===0){
    return (
        <div className='w-full py-8 text-center'>
            <Container>
                <div className='flex flex-wrap'>
                    <div className='p-2 w-full'>
                        <h1 className='text-2xl font-bold hover:text-gray-500'>
                                Login to read posts
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    )
  }else{
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {
                    posts.map((post) => (
                        <div className='p-2 w-1/4' ket={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))
                }
            </div>
        </Container>
    </div>
  }
}


export default Home