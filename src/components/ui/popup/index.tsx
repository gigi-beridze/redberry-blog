import React, { useEffect, useState } from "react";
import { Button } from "../button";
import { Input } from "../input";
import axios from "axios";

interface PopupProps {
  onClose: () => void;
}interface User {
  email: string;
  // Add other properties as needed
}

export const Popup: React.FC<PopupProps> = ({ onClose }) => {

  const [result, setResult] = useState<string | null>(null);





  const [email, setEmail] = useState<string>('');
  const [isValid, setValid] = useState<boolean | null>(null);

  const handleButtonClick = () => {
    const isValidEmail = email !== '' && /^[^\s@]+@redberry\.ge$/.test(email);

    if (isValidEmail) {
      console.log("It's done!");
      setValid(true);
        const fetchData = async () => {
          try {
            const response = await axios.post(
              'https://api.blog.redberryinternship.ge/api/login',
              {
                email,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
      
            if (response.status === 200) {
              // Check the response body or any specific indicator
              if (response.data && response.data.userExists) {
                setResult('User is registered.');
              } else {
                setResult('User is not registered.');
              }
            } else {
              setResult('Unexpected response from the server');
            }
          } catch (error) {
            console.error('Error checking user existence:', error);
            setValid(false); // Set to false if there's an error
          }
                    
          
      }
      fetchData(); // Call the async function inside useEffect
    
  
    } else {// export const Popup: React.FC<PopupProps> = ({ onClose }) => {

      setValid(false);
    }
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      {result}
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <img src="src/assets/x.png" alt="x" />
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
              <p className="error-message">Invalid email address</p>
              ) : null 
            }
            <Button text="შესვლა" onClick={handleButtonClick} />
          </>
        ) : (
          <div className="popup-logined">
            <div className="popup-image">
            <img src="src/assets/tick-circle.png" alt="correct-icon" />
            </div>
            <span>წარმატებული ავტორიზაცია</span>
            <Button text="კარგი" onClick={onClose} />
          </div>
        )}
      </div>
    </div>
  );
};

