import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { BlogDetails } from './pages/BlogDetails';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:blogId" element={<BlogDetails />} />
      </Routes>
    </>
  )
}

export default App
