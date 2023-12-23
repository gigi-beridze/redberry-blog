// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { blog } from '../../models/blog';
// import { Link } from 'react-router-dom';
// import Filters from '../filters';


// // interface BlogPost {
// //     id: number;
// //     title: string;
// //     description: string;
// //     image: string;
// //     publish_date: string;
// //     categories: { name: string }[];
// //     author: string;
// //   }
// // export const Blogs: React.FC = () => {
// //     const [blogPosts, setBlogPosts] = useState([]);

// //     const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
// //     const [allCategories, setAllCategories] = useState<any[]>([]);
  

// //     useEffect(() => {
// //         try {
// //             const url = "https://api.blog.redberryinternship.ge/api/blogs",
// //                   token = "b5d0d96fd514c0fcf356195257373cc6603d5c32284b7b59cf859c4a3a3dd7f5", 
// //                   config = {
// //                     headers: { Authorization: `Bearer ${token}` }
// //                   };
// //             axios.get(url, config)
// //             .then((response:any) => {
// //                 setBlogPosts(response.data.data);

            
            
// //             })
// //             .catch(error => {
// //                 console.error('API Error:', error);
// //             });
        
// //         } catch (error) {
// //             console.error('Error fetching data:', error);
// //         }
    
// //   }, []);   




// //   const handleFilter = (category: string) => {
// //     setSelectedCategories((prevSelectedCategories) => {
// //       if (prevSelectedCategories.includes(category)) {
// //         // Remove category if already selected
// //         return prevSelectedCategories.filter((c) => c !== category);
// //       } else {
// //         // Add category if not selected
// //         return [...prevSelectedCategories, category];
// //       }
// //     });
// //   };

// //   const filterPostsByCategories = (selectedCategories: string[]): BlogPost[] => {
// //     return selectedCategories.length
// //       ? blogPosts.filter((post:any) => selectedCategories.every((category) =>
// //           post.categories.some((cat:any) => cat.name === category)
// //         )
// //       )
// //       : blogPosts;
// //   };

// //   const filteredPosts:any = filterPostsByCategories(selectedCategories);
// //   console.log(filteredPosts)


// //   return (
// //     <div className="blogs">
// //         {/* {allCategories.map((category:any) => (
// //           <button
// //             key={category.id}
// //             onClick={() => handleFilter(category)}
// //             style={{
// //               background: selectedCategories.includes(category) ? 'lightblue' : 'white',
// //             }}
// //           >
// //             {category}
// //           </button> */}
// //         {/* ))} */}
// //         <button onClick={() => handleFilter("UI/UX")}>fa</button>
// //         <div className="container">
// //             {filteredPosts.map((blog: blog) => (
// //                 <div className="blog" key={blog.id}>
// //                     <img src={blog.image} alt="blog_image" />
// //                     <span className="blog-author">{blog.author}</span>
// //                     <span className="blog-date">{blog.publish_date}</span>
// //                     <span className="blog-title">{blog.title}</span>
// //                     <div className="blog-categories">
// //                         {/* {blog.categories.map((categorie) => (
// //                             <button    
// //                                 className="blog-categories-btn"       
// //                                 style={{
// //                                     backgroundColor: categorie.background_color,
// //                                     color: categorie.text_color,
// //                                 }}
// //                                 key={categorie.id}
// //                             >
// //                                 {categorie.title}
// //                             </button>
// //                         ))} */}
// //                     </div>
// //                     <span className="blog-description">{blog.description}</span>
// //                     <Link to={`/blog/${blog.id}`} className="blog-info-btn">
// //                         სრულად ნახვა
// //                         <img style={{marginLeft: '4px'}} src="src/assets/arrow.svg" />
// //                     </Link>
// //                 </div>
// //             ))}
// //         </div>
// //     </div>
// //   );
// // }; 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { blog } from '../../models/blog';
import { Link } from 'react-router-dom';
import Filters from '../filters';

export const Blogs: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<blog[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    try {
      const url = 'https://api.blog.redberryinternship.ge/api/blogs';
      const token = 'b5d0d96fd514c0fcf356195257373cc6603d5c32284b7b59cf859c4a3a3dd7f5';
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      axios.get(url, config)
        .then((response: any) => {
          setBlogPosts(response.data.data);
        })
        .catch((error) => {
          console.error('API Error:', error);
        });

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    const storedCategories = localStorage.getItem('selectedCategories');
    if (storedCategories) {
      setSelectedCategories(JSON.parse(storedCategories));
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
          selectedCategories.every((category) =>
            post.categories.some((cat: any) => cat.title.toLowerCase() === category.toLowerCase())
          )
        )
      : blogPosts;
  };

  const filteredPosts: any = filterPostsByCategories(selectedCategories);

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
              <img style={{ marginLeft: '4px' }} src="src/assets/arrow.svg" alt="arrow" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};







// export const Blogs: React.FC = () => {
//   const [blogPosts, setBlogPosts] = useState<blog[]>([]);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

 

//   useEffect(() => {
//     try {
//       const url = 'https://api.blog.redberryinternship.ge/api/blogs';
//       const token = 'b5d0d96fd514c0fcf356195257373cc6603d5c32284b7b59cf859c4a3a3dd7f5';
//       const config = {
//         headers: { Authorization: `Bearer ${token}` },
//       };

//       axios.get(url, config)
//         .then((response: any) => {
//           setBlogPosts(response.data.data);
//         })
//         .catch((error) => {
//           console.error('API Error:', error);
//         });

//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   }, []);

//   const handleSelectCategory = (category: string) => {
//     setSelectedCategories((prevSelectedCategories) => {
//       if (prevSelectedCategories.includes(category)) {
//         return prevSelectedCategories.filter((c) => c !== category);
//       } else {
//         return [...prevSelectedCategories, category];
//       }
//     });
//   };

//   const filterPostsByCategories = (selectedCategories: string[]): blog[] => {
//     return selectedCategories.length
//       ? blogPosts.filter((post: any) =>
//           selectedCategories.every((category) =>
//             post.categories.some((cat: any) => cat.title.toLowerCase() === category.toLowerCase())
//           )
//         )
//       : blogPosts;
//   };

//   const filteredPosts: any = filterPostsByCategories(selectedCategories);
// console.log(filteredPosts)
//   return (
//     <div className="blogs">
//       <Filters onSelectCategory={handleSelectCategory} />
//       <div className="container">
//         {filteredPosts.map((blog: blog) => (
//           <div className="blog" key={blog.id}>
//             <img src={blog.image} alt="blog_image" />
//             <span className="blog-author">{blog.author}</span>
//             <span className="blog-date">{blog.publish_date}</span>
//             <span className="blog-title">{blog.title}</span>
//             <div className="blog-categories">
//              {blog.categories.map((categorie) => ( 
//                             <button    
//                                 className="blog-categories-btn"       
//                                 style={{
//                                     backgroundColor: categorie.background_color,
//                                     color: categorie.text_color,
//                                 }}
//                                 key={categorie.id}
//                             >
//                                 {categorie.title}
//                             </button>
//                         ))} 
//             </div>
//             <span className="blog-description">{blog.description}</span>
//             <Link to={`/blog/${blog.id}`} className="blog-info-btn">
//               სრულად ნახვა
//               <img style={{ marginLeft: '4px' }} src="src/assets/arrow.svg" alt="arrow" />
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
