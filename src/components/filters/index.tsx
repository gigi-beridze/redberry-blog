import axios from "axios";
import { useEffect, useState } from "react";
import { Category } from "../../models/filters";

export const Filters = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const url = 'https://api.blog.redberryinternship.ge/api/categories/',
              token = 'af615548e1c85d4dc19c310b551d67dbdcd6db11d5e26961118f959931d50675',
              config = {
                headers: { Authorization: `Bearer ${token}` }
              };
  
        axios.get(url, config)
            .then(response => {
                setCategories(response.data.data)
            })
            .catch(error => {
                console.error('API Error:', error);
            });
    }, []); 
    return (
        <div className="filters">
            {categories.map(item => (
                <button    
                    className="filter-btn"       
                    style={{
                        backgroundColor: item.background_color,
                        color: item.text_color,
                    }}
                    key={item.id}
                >
                    {item.title}
                </button>
            ))}
        </div>
    )
}