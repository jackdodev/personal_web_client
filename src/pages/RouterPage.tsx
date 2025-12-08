import { BrowserRouter, Routes, Route } from 'react-router'

import BlogListPage from './blog/BlogListPage'
import BlogDetailPage from './blog/BlogDetailPage'
import BlogEditPage from './blog/BlogEditPage'
import ProjectListPage from './project/ProjectListPage'
import ProjectDetailPage from './project/ProjectDetailPage'
import ProjectEditPage from './project/ProjectEditPage'
import LandingPage from './LandingPage'

const RouterPage : React.FC = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/blog">
                        <Route index element={<BlogListPage />} />
                        <Route path="/blog/new" element={<BlogEditPage />} />
                        <Route path="/blog/:blogId" element={<BlogDetailPage />} />
                    </Route>
                    <Route path="/project">
                        <Route index element={<ProjectListPage />} />
                        <Route path="/project/new" element={<ProjectEditPage />} />
                        <Route path="/project/:projectId" element={<ProjectDetailPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default RouterPage;