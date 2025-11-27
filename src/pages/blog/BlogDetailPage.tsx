import { useEffect } from 'react';
import { useParams } from 'react-router'
import Header from '../Header';
import Footer from '../Footer';

const BlogDetailPage: React.FC = () => {
    const { blogId } = useParams();

    useEffect(() => {
        // Fetch blog details using blogId
    })

    return (
        <div className="text-secondary bg-[#f7f9fb] min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <div>
                    <h1>blog details, { blogId }</h1>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default BlogDetailPage
