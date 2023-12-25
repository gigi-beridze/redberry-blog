import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { BlogDetails } from './pages/BlogDetails';
import { AddBlog } from './pages/AddBlog';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    // Check if the user is logged in
    const isLogined = localStorage.getItem('isLogined') === 'true';

    // If not logged in, redirect to the login page or handle it as needed
    if (!isLogined) {
      // You can redirect to a login page or handle it based on your authentication flow
      // For this example, I'm redirecting to the home page
      // window.location.href = '/';
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:blogId" element={<BlogDetails />} />
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
