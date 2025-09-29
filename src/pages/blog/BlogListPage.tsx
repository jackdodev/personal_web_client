import axios from 'axios'
import { useEffect, useState } from 'react'

const BlogListPage: React.FC = () => {
    const [posts, setPosts] = useState<Array<any>>([])
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://localhost:8080/blog',
            responseType: 'stream'
        }).then(function (response) {
            console.log('Response received')
            var newBlogs = [...posts, response.data]
            setPosts(newBlogs)
        }).finally(() => {
            setLoading(false);
        })
    }, [])

    return (
        <div>
            <h1>Blog List Page</h1>
            { loading && <p>Loading...</p> }
            { !loading && posts.map((post, index) => (
                <div key={index}> 
                    <h2>Post {index + 1}</h2>
                    <p>{JSON.stringify(post)}</p>
                </div>
            )) }
        </div>
    )
}

export default BlogListPage