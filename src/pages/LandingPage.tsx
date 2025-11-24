import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const LandingPage : React.FC = () => {
    const [posts, setPosts] = useState<Array<any>>([])
    const [projects, setProjects] = useState<Array<any>>([])
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios({
            method: 'GET',
            url: import.meta.env.REACT_APP_BACKEND_SERVER_URL,
            responseType: 'stream'
        }).then(function (response) {
            var resp = JSON.parse(response.data)
            var newBlogs = [...posts, ...resp['blogs']]
            var newProjects = [...projects, ...resp['projects']]
            setPosts(newBlogs)
            setProjects(newProjects)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    return (
        <div className="text-secondary bg-[#f7f9fb] min-h-screen">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                {/* Blog Posts Section (Minimized List View) */}
                <section id="blog" className="mb-20">
                    <h2 className="text-3xl font-bold text-secondary mb-8 pb-3 border-b-2 border-primary">
                        Latest Blog Posts
                    </h2>

                    <div className="space-y-6">
                        {posts.map((post) => (
                        <a 
                            key={post.blog_id} 
                            // href={post.href} 
                            className="block bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-l-4 border-accent hover:border-primary"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                <div className="mb-3 md:mb-0">
                                    <h3 className="text-xl font-bold text-secondary mb-1">
                                        {post.subject}
                                    </h3>
                                </div>
                                {/* <div className="text-sm text-gray-400 flex-shrink-0">
                                    <span className="font-medium text-primary mr-2">#{post.tags[0]}</span>
                                    <span>{post.date}</span>
                                </div> */}
                            </div>
                        </a>
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <a href="#" className="inline-block px-6 py-3 bg-white text-primary border-2 border-primary font-semibold rounded-lg shadow-md hover:bg-indigo-50 transition duration-300">
                            View All Posts &rarr;
                        </a>
                    </div>
                </section>

                {/* Projects List Section (Minimized List View) */}
                <section id="projects">
                    <h2 className="text-3xl font-bold text-secondary mb-8 pb-3 border-b-2 border-primary">
                        Featured Projects
                    </h2>

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

                    <div className="mt-8 text-center">
                        <a href="#" className="inline-block px-6 py-3 bg-white text-primary border-2 border-primary font-semibold rounded-lg shadow-md hover:bg-indigo-50 transition duration-300">
                            View All Projects &rarr;
                        </a>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default LandingPage;