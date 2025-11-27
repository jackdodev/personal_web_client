import { useParams } from 'react-router'
import Header from '../Header';
import Footer from '../Footer';

const ProjectDetailPage: React.FC = () => {
    const { projectId } = useParams();

    return (
        <div className="text-secondary bg-[#f7f9fb] min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <div>
                    <h1>project detail page, { projectId }</h1>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default ProjectDetailPage