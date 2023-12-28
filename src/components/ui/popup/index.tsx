import React, { useState } from "react";
import { Button } from "../button";
import { Input } from "../input";
import axios from "axios";
import { PopupProps } from "../../../models/global";

export const Popup: React.FC<PopupProps> = ({ onClose }) => {
  const [email, setEmail] = useState<string>(''),
        [isValid, setValid] = useState<boolean | null>(null);

  const fetchData = async () => {
    try {
      await axios.post(
        'https://api.blog.redberryinternship.ge/api/login',
        { email },
        { 
          headers: { 
            'Content-Type': 'application/json' 
          } 
        }
      );

      setValid(true);
      localStorage.setItem('isLogined', 'true');
    } catch (error) {
      console.error('Error checking user existence:', error);
      setValid(false);
    }
  };

  const handleButtonClick = () => {
    const isValidEmail = email !== '' && /^[^\s@]+@redberry\.ge$/.test(email);

    if (isValidEmail) {
      fetchData();
    } else {
      setValid(false);
    }
}
const closeAndReload = () => {
  onClose();
  window.location.href= '/';
};
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <img src="/src/assets/x.png" alt="x" />
        </button>
        {!isValid ? (
          <>
            <span>შესვლა</span>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={isValid === null ? 'default' : isValid ? 'valid' : 'invalid'}
              label="ელ-ფოსტა"
              id="email"
              name="email"
              placeholder="Example@redberry.ge"
            />
            { isValid === false ? (
              <p className="error-message">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10.0002 1.66666C5.41683 1.66666 1.66683 5.41666 1.66683 10C1.66683 14.5833 5.41683 18.3333 10.0002 18.3333C14.5835 18.3333 18.3335 14.5833 18.3335 10C18.3335 5.41666 14.5835 1.66666 10.0002 1.66666Z" fill="#EA1919"/>
                  <path d="M10 13.3333L10 9.16666" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10.0044 6.66667L9.99691 6.66667" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>  
                &nbsp;  ელ-ფოსტა არ მოიძებნა
              </p>
              ) : null 
            }
            <Button text="შესვლა" onClick={handleButtonClick} />
          </>
        ) : (
          <div className="popup-logined">
            <div className="popup-image">
            <img src="/src/assets/tick-circle.png" alt="correct-icon" />
            </div>
            <span>წარმატებული ავტორიზაცია</span>
            <Button text="კარგი" onClick={closeAndReload} />
          </div>
        )}
      </div>
    </div>
  );
};