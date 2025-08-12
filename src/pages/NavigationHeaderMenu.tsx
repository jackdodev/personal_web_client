import { useNavigate } from 'react-router'

const NavigationHeaderMenu: React.FC = () => {
    let navigate = useNavigate();

    return (
        <div>
            <h1>Navigation</h1>
            <button onClick={() => navigate('/')}>
                <h4>Home</h4>
            </button>
            <button onClick={() => navigate('/blog')}>
                <h4>Blogs</h4>
            </button>
            <button onClick={() => navigate('/project')}>
                <h4>Projects</h4>
            </button>
        </div>
    )
}

export default NavigationHeaderMenu;
