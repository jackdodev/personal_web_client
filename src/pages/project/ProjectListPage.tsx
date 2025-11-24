import axios from 'axios'
import { useEffect, useState } from 'react'
import Header from '../Header';
import Footer from '../Footer';

const ProjectListPage: React.FC = () => {
    const [projects, setProjects] = useState<Array<any>>([])
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        axios({
            method: 'GET',
            url: import.meta.env.REACT_APP_BACKEND_SERVER_URL+'/project',
            responseType: 'stream'
        }).then(function (response) {
            console.log('Response received')
            var resp = JSON.parse(response.data)
            var newProjects = [...projects, ...resp]
            setProjects(newProjects)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    return (
        <div className="text-secondary bg-[#f7f9fb] min-h-screen">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <section id="blog" className="mb-20">
                    <div className="space-y-6">
                        {projects.map((project) => (
                        <a 
                            key={project.project_id} 
                            // href={project.href} 
                            className="block bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-l-4 border-primary hover:border-accent"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start">
                                <div className="mb-3 md:mb-0">
                                    <h3 className="text-xl font-bold text-secondary mb-1">
                                        {project.name}
                                    </h3>
                                    {/* <div className="text-sm space-x-2">
                                    {project.techStack.map((tech) => (
                                        <span key={tech.name} className={`${tech.bgColor} ${tech.textColor} px-3 py-1 rounded-full font-medium inline-block`}>
                                        {tech.name}
                                        </span>
                                    ))}
                                    </div> */}
                                </div>
                            </div>
                        </a>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
       </div>
    )
}

export default ProjectListPage
