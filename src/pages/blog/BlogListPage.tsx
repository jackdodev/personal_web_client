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
        <div className="text-secondary bg-[#f7f9fb] min-h-screen">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <section id="blog" className="mb-20">
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
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default BlogListPage