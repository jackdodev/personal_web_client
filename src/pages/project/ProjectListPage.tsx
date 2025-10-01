import axios from 'axios'
import { useEffect, useState } from 'react'

const ProjectListPage: React.FC = () => {
    const [projects, setProjects] = useState<Array<any>>([])
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        axios({
            method: 'GET',
            url: import.meta.env.VITE_BACKEND_SERVER_URL+'/project',
            responseType: 'stream'
        }).then(function (response) {
            console.log('Response received')
            var newProjects = [...projects, response.data]
            setProjects(newProjects)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    return (
        <div>
            <h1>Project list page</h1>
            { loading && <p>Loading...</p> }
            { !loading && projects.map((project, index) => (
                <div key={index}>
                    <h2>Project {index + 1}</h2>
                     <p>{JSON.stringify(project)}</p>
                </div>
            ))} 
       </div>
    )
}

export default ProjectListPage
