import { useParams } from 'react-router'

const ProjectDetailPage: React.FC = () => {

    const { projectId } = useParams();

    return (
        <div>
            <h1>project detail page, { projectId }</h1>
        </div>
    )
}

export default ProjectDetailPage