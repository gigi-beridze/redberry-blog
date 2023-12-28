import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { BlogDetails } from './pages/BlogDetails';
import { AddBlog } from './pages/AddBlog';
import { useEffect, useState } from 'react';

const App = () => {
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);
  useEffect(() => {
    const variableFromLocalStorage = localStorage.getItem('isLogined');
    
    setIsAllowed(variableFromLocalStorage === 'true');
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:blogId" element={<BlogDetails />} />
        {isAllowed ? (
          <Route path="/add-blog" element={<AddBlog />} />
        ) : (
          <Route path="/add-blog" element={<Navigate to="/" />} />
        )}       
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
