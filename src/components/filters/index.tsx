import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Category } from '../../models/filters';

interface FiltersProps {
  onSelectCategory: (category: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const fetchCategories = async () => {
    try {
      const url = 'https://api.blog.redberryinternship.ge/api/categories/';
      const token = 'af615548e1c85d4dc19c310b551d67dbdcd6db11d5e26961118f959931d50675';
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.get(url, config);
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

export default Filters;
