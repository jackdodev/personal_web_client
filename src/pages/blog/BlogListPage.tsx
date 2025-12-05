import axios from 'axios'
import { useEffect, useState } from 'react'
import Header from '../Header';
import Footer from '../Footer';

const BlogListPage: React.FC = () => {
    const [posts, setPosts] = useState<Array<any>>([])
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        axios({
            method: 'GET',
            url: import.meta.env.REACT_APP_BACKEND_SERVER_URL+'/blog',
            responseType: 'stream'
        }).then(function (response) {
            console.log('Response received')
            var resp = JSON.parse(response.data)
            var newBlogs = [...posts, ...resp]
            setPosts(newBlogs)
        }).finally(() => {
            setLoading(false);
        })
    }, [])

    return (
        <div className="text-secondary bg-[#f7f9fb] min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <section id="blog" className="mb-20">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold">Blog</h2>
                        <a href="/blog/new" className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md shadow hover:bg-primary/90 transition">
                            New Post
                        </a>
                    </div>
                    <div className="space-y-6">
                        {posts.map((post) => (
                        <a 
                            key={post.blog_id} 
                            href={"/blog/"+post.blog_id} 
                            className="block bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-l-4 border-accent hover:border-primary"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                <div className="mb-3 md:mb-0">
                                    <h3 className="text-xl font-bold text-secondary mb-1">
                                        {post.subject}
                                    </h3>
                                </div>
                                <div className="flex items-center space-x-3 text-sm text-gray-400 flex-shrink-0">
                                    <div className="flex items-center space-x-2">
                                        {post.tags.map((tag: string) => (
                                            <span className="font-medium text-primary">#{tag}</span>
                                        ))}
                                        <span>{post.date}</span>
                                    </div>
                                    <button
                                        onClick={(e: any) => { e.preventDefault(); e.stopPropagation(); window.location.href = `/blog/${post.blog_id}/edit`; }}
                                        className="inline-flex items-center px-3 py-1 text-sm bg-white text-primary border border-primary rounded-md hover:bg-primary/10 transition"
                                        aria-label={`Edit ${post.subject}`}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={(e: any) => { e.preventDefault(); e.stopPropagation(); window.location.href = `/blog/${post.blog_id}/edit`; }}
                                        className="inline-flex items-center px-3 py-1 text-sm bg-white text-primary border border-primary rounded-md hover:bg-primary/10 transition"
                                        aria-label={`Delete ${post.subject}`}
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

export default BlogListPage