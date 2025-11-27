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
        <div className="text-secondary bg-[#f7f9fb] min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <section id="blog" className="mb-20">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold">Project</h2>
                        <a href="/project/new" className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md shadow hover:bg-primary/90 transition">
                            New Project
                        </a>
                    </div>
                    <div className="space-y-6">
                        {projects.map((project) => (
                        <a 
                            key={project.project_id} 
                            href={"/project/"+project.project_id} 
                            className="block bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-l-4 border-primary hover:border-accent"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start">
                                <div className="mb-3 md:mb-0">
                                    <h3 className="text-xl font-bold text-secondary mb-1">
                                        {project.name}
                                    </h3>
                                </div>
                                <div className="flex items-center space-x-3 text-sm text-gray-400 flex-shrink-0">
                                    <div className="flex items-center space-x-2">
                                        <span className="font-medium text-primary">#tag</span>
                                        <span>{project.date}</span>
                                    </div>
                                    <button
                                        onClick={(e: any) => { e.preventDefault(); e.stopPropagation(); window.location.href = `/blog/${post.blog_id}/edit`; }}
                                        className="inline-flex items-center px-3 py-1 text-sm bg-white text-primary border border-primary rounded-md hover:bg-primary/10 transition"
                                        aria-label={`Edit ${project.subject}`}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={(e: any) => { e.preventDefault(); e.stopPropagation(); window.location.href = `/blog/${post.blog_id}/edit`; }}
                                        className="inline-flex items-center px-3 py-1 text-sm bg-white text-primary border border-primary rounded-md hover:bg-primary/10 transition"
                                        aria-label={`Delete ${project.subject}`}
                                    >
                                        Delete
                                    </button>
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
