// import axios from "axios";
// import { useEffect, useState } from "react";

// const [blogs, setBlogs] = useState([]);

// export default() => {
// useEffect(() => {
//     try {
//         const url = "https://api.blog.redberryinternship.ge/api/blogs",
//               token = "b5d0d96fd514c0fcf356195257373cc6603d5c32284b7b59cf859c4a3a3dd7f5", 
//               config = {
//                 headers: { Authorization: `Bearer ${token}` }
//               };
//         axios.get(url, config)
//         .then(response => {
//             setBlogs(response.data.data);

//             return blogs;
//         })
//         .catch(error => {
//             console.error('API Error:', error);
//         });
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }, []);   

// }