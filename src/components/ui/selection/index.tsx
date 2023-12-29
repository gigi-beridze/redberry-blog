import React, { useState, useEffect, useRef } from 'react';
import { getCategories } from '../../../api/getCategories';

const STORAGE_KEY = 'formSelectedCategories';

export const MultipleSelectChip: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedButtons, setSelectedButtons] = useState<any[]>(() => {
    // Retrieve selected categories from localStorage on component mount
    const storedCategories = localStorage.getItem(STORAGE_KEY);
    return storedCategories ? JSON.parse(storedCategories) : [];
  });

  const data = getCategories();
  const dropdownRef: any = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Click occurred outside the dropdown, close it
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Save selected categories to localStorage whenever the selection changes
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedButtons));
  }, [selectedButtons]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleButtonClick = (button: any) => {
    const isSelected = selectedButtons.some((selectedButton) => selectedButton.id === button.id);

    if (isSelected) {
      setSelectedButtons((prevSelectedButtons) =>
        prevSelectedButtons.filter((selectedButton) => selectedButton.id !== button.id)
      );
    } else {
      setSelectedButtons((prevSelectedButtons) => [...prevSelectedButtons, button]);
    }
  };

  const handleRemoveButtonClick = (button: any) => {
    setSelectedButtons((prevSelectedButtons) =>
      prevSelectedButtons.filter((selectedButton) => selectedButton.id !== button.id)
    );
  };
  const selectedButtonsLabel = selectedButtons.map((button) => button.title).join(', ');

  return (
    <div ref={dropdownRef}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <div>
          {!selectedButtonsLabel.length ? (
            <input
              type="text"
              onClick={toggleDropdown}
              placeholder="აირჩიეთ კატეგორია"
              className="select-input"
            />
          ) : (
            <div className="input-container" onClick={toggleDropdown}>
              <div className="buttons-container">
                {selectedButtons.map((item): any => (
                  <div key={item.id} className='ragaca' style={{ display: 'flex', alignItems: 'center' }}>
                    <button
                      className="filter-btn"
                      key={item.id}
                      style={{
                        backgroundColor: item.background_color,
                        color: item.text_color,
                      }}
                    >
                      {item.title}
                      <button
                        key={item.id}
                        className="remove-btn"
                        onClick={() => handleRemoveButtonClick(item)}
                      >
                        X
                      </button>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {isOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              maxHeight: '150px',
              overflowY: 'auto',
              overflowX: 'hidden',
              border: '1px solid #E4E3EB',
              backgroundColor: 'white',
              zIndex: 1,
              borderRadius: '12px',
            }}
          >
            {data.map((item: any) => (
              <button
                className={`filter-btn`}
                style={{
                  backgroundColor: item.background_color,
                  color: item.text_color,
                  margin: '3px',
                }}
                key={item.id}
                onClick={() => handleButtonClick(item)}
              >
                {item.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
