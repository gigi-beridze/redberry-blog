import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { blog } from '../../models/blog';
import { Link } from 'react-router-dom';
import { Filters } from '../filters';

export const Blogs: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<blog[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    try {
      const url = 'https://api.blog.redberryinternship.ge/api/blogs',
            token = '5695cf4697d45243e6bdab77e34fe2578befea217e5a12e7e7c925a217704ac2',
            config = {
              headers: { Authorization: `Bearer ${token}` },
            },
            storedCategories = localStorage.getItem('selectedCategories');

      axios.get(url, config)
        .then((response: any) => {
          setBlogPosts(response.data.data);
        })
        .catch((error) => {
          console.error('API Error:', error);
        });
      if (storedCategories) {
        setSelectedCategories(JSON.parse(storedCategories));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  const handleSelectCategory = (category: string) => {
    setSelectedCategories((prevSelectedCategories) => {
      const isCategorySelected = prevSelectedCategories.includes(category);
      const updatedCategories = isCategorySelected
        ? prevSelectedCategories.filter((c) => c !== category)
        : [...prevSelectedCategories, category];

      localStorage.setItem('selectedCategories', JSON.stringify(updatedCategories));
      
      return updatedCategories;
    });
  };

  const filterPostsByCategories = (selectedCategories: string[]): blog[] => {
    return selectedCategories.length
      ? blogPosts.filter((post: any) =>
          selectedCategories.some((category) =>
            post.categories.some((cat: any) => cat.title.toLowerCase() === category.toLowerCase())
          )
        )
      : blogPosts;
  };
  const filteredPosts = filterPostsByCategories(selectedCategories);
  
  return (
    <div className="blogs">
      <Filters onSelectCategory={handleSelectCategory} />
      <div className="container">
        {filteredPosts.map((blog: blog) => (
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
              <img style={{ marginLeft: '4px' }} src="/src/assets/arrow.svg" alt="arrow" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};