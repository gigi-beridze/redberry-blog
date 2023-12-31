import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiltersProps } from '../../models/filters';
import { Category } from '../../models/global';

export const Filters: React.FC<FiltersProps> = ({ onSelectCategory }) => {
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
    const storedCategories = localStorage.getItem('selectedCategories');

    if (storedCategories) {
      setSelectedCategories(JSON.parse(storedCategories));
    }
  }, []);

  const handleCategoryClick = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
    onSelectCategory(category);
    localStorage.setItem('selectedCategories', JSON.stringify(updatedCategories));
  };

  const renderFilterButtons = () => {
    return categories.map((item) => (
      <button
        className={`filter-btn ${selectedCategories.includes(item.title) ? 'selected' : ''}`}
        style={{
          backgroundColor: item.background_color,
          color: item.text_color,
          border: selectedCategories.includes(item.title) ? '1px solid black' : 'none',
        }}
        key={item.id}
        onClick={() => handleCategoryClick(item.title)}
      >
        {item.title}
      </button>
    ));
  };

  return <div className="filters">{renderFilterButtons()}</div>;
};