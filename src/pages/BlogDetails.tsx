import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from '../components/navbar';
import { BlogDetail } from '../components/blog-detail';

interface BlogDetailsParams {
  blogId: string;
}

export const BlogDetails: React.FC = () => {
  const { blogId } = useParams<any>();
  const [blogDetails, setBlogDetails] = useState<any>(null);

  useEffect(() => {
    try {
        const url =`https://api.blog.redberryinternship.ge/api/blogs/${blogId}`,
              token = "b5d0d96fd514c0fcf356195257373cc6603d5c32284b7b59cf859c4a3a3dd7f5", 
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

  if (!blogDetails) {
    // You might want to add a loading spinner or message here
    return <p>Loading...</p>;
  }

  console.log(blogDetails)

  // Render the blog details
  return (
    <div>
                <Navbar />
                <BlogDetail data={blogDetails} />
 
    </div>
  );
};