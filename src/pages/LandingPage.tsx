import axios from 'axios';
import { useEffect, useState } from 'react';

const LandingPage : React.FC = () => {
    const [posts, setPosts] = useState<Array<any>>([])
    const [projects, setProjects] = useState<Array<any>>([])
    const [loading, setLoading] = useState<boolean>(true);

    console.log(import.meta.env.MODE)
    useEffect(() => {
        axios({
            method: 'GET',
            url: import.meta.env.BACKEND_SERVER_URL,
            responseType: 'stream'
        }).then(function (response) {
            console.log('Response received')
            var resp = JSON.parse(response.data)
            var newBlogs = [...posts, resp['blogs']]
            var newProjects = [...projects, resp['projects']]
            setPosts(newBlogs)
            setProjects(newProjects)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    return (
        <div>
            <h1>Landing page</h1>
            { loading && <p>Loading...</p> }
            { !loading && posts.map((post, index) => (
                <div key={index}> 
                    <h2>Post {index + 1}</h2>
                    <p>{JSON.stringify(post)}</p>
                </div>
            )) }
            { !loading && projects.map((project, index) => (
                <div key={index}>
                    <h2>Project {index + 1}</h2> 
                    <p>{JSON.stringify(project)}</p>
                </div>
            ))}
        </div>
    )
}

export default LandingPage;