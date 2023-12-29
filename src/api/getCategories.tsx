import { useEffect, useState } from "react";
import { Category } from "../models/global";
import axios from "axios";

export const getCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]),
    [selectedCategories, setSelectedCategories] = useState<string[]>([]);

const fetchCategories = async () => {
try {
  const url = 'https://api.blog.redberryinternship.ge/api/categories/',
        token = '5695cf4697d45243e6bdab77e34fe2578befea217e5a12e7e7c925a217704ac2',
        config = {
          headers: { Authorization: `Bearer ${token}` },
        },
        response = await axios.get(url, config);

  setCategories(response.data.data);
} catch (error) {
  console.error('API Error:', error);
}
};

useEffect(() => {
    fetchCategories();
},[])

    return categories
}