
import { useParams } from 'react-router'

const BlogDetailPage: React.FC = () => {

    const { blogId } = useParams();
    return (
        <div>
            <h1>blog details, { blogId }</h1>
        </div>
    )
}

export default BlogDetailPage
