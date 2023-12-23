import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { blog } from '../../models/blog';
import { Link } from 'react-router-dom';
  
export const Blogs: React.FC = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        try {
            const url = "https://api.blog.redberryinternship.ge/api/blogs",
                  token = "b5d0d96fd514c0fcf356195257373cc6603d5c32284b7b59cf859c4a3a3dd7f5", 
                  config = {
                    headers: { Authorization: `Bearer ${token}` }
                  };
            axios.get(url, config)
            .then(response => {
                setBlogs(response.data.data);
            })
            .catch(error => {
                console.error('API Error:', error);
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
  }, []);   

  return (
    <div className="blogs">
        <div className="container">
            {blogs.map((blog: blog) => (
                <div className="blog" key={blog.id}>
                    <img src={blog.image} alt="blog_image" />
                    <span className="blog-author">{blog.author}</span>
                    <span className="blog-date">{blog.publish_date}</span>
                    <span className="blog-title">{blog.title}</span>
                    <div className="blog-categories">
                        {blog.categories.map((categorie) => (
                            <button    
                                className="blog-categories-btn"       
                                style={{
                                    backgroundColor: categorie.background_color,
                                    color: categorie.text_color,
                                }}
                                key={categorie.id}
                            >
                                {categorie.title}
                            </button>
                        ))}
                    </div>
                    <span className="blog-description">{blog.description}</span>
                    <Link to={`/blog/${blog.id}`} className="blog-info-btn">
                        სრულად ნახვა
                        <img style={{marginLeft: '4px'}} src="src/assets/arrow.svg" />
                    </Link>
                </div>
            ))}
        </div>
    </div>
  );
}; 