import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './components/Layout/Layout'
import HomePage from './pages/HomePage'
import ProjectPage from './pages/ProjectPage/ProjectPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="projects/:slug" element={<ProjectPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
