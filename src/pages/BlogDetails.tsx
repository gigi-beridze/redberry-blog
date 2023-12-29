import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from '../components/navbar';
import { BlogDetail } from '../components/blog-detail';
import { Slider } from '../components/slider';

export const BlogDetails: React.FC = () => {
  const { blogId } = useParams<any>();
  const [blogDetails, setBlogDetails] = useState<any>(null);

  useEffect(() => {
    try {
      const url =`https://api.blog.redberryinternship.ge/api/blogs/${blogId}`,
            token = "5695cf4697d45243e6bdab77e34fe2578befea217e5a12e7e7c925a217704ac2", 
            config = {
              headers: { Authorization: `Bearer ${token}` }
            };
      
      axios.get(url, config)
      .then(response => {
          setBlogDetails(response.data);
      })
      .catch(error => {
          console.error('API Error:', error)
      })
        } catch (error) {
      console.error('Error fetching blog details:', error);
    }
  }, [blogId]);

  if(!blogDetails) {
    return <p>loading..</p>;
  }

  return (
    <>
      <Navbar />
      <BlogDetail data={blogDetails} />
      <Slider items={blogDetails}/>  
    </>
  );
};