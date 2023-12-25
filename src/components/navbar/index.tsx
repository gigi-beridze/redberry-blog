import { useEffect, useState } from "react";
import { Button } from "../ui/button"
import { Popup } from "../ui/popup";
import { Link } from 'react-router-dom';

export const Navbar = () => {
    const [isPopupVisible, setPopupVisibility] = useState(false);

    const openPopup = () => setPopupVisibility(true);
    const closePopup = () => setPopupVisibility(false);


    const [isLoginned, setIsLoginned] = useState<boolean>(false);

    // useEffect to check and set the login status from localStorage
    useEffect(() => {
      const storedLoginStatus = localStorage.getItem('isLogined');
      if (storedLoginStatus) {
        setIsLoginned(JSON.parse(storedLoginStatus));
      }
    }, []);
  
    // Function to handle button click and toggle login status
    const handleButtonClick = () => {
      const newLoginStatus = !isLoginned;
      setIsLoginned(newLoginStatus);
      // Save login status to localStorage
      localStorage.setItem('isLogined', JSON.stringify(newLoginStatus));
    };


    return (
        <div className="navbar">
            <div className="container">
                <Link to="/">
                    <img src="/logo.png" alt="logo" />
                </Link>
                <button onClick={handleButtonClick}>faa</button>
                <Button text={!isLoginned ? 'შესვლა' : 'ბლოგის დამატებას'} onClick={openPopup} />
                {isPopupVisible && <Popup onClose={closePopup} />}
            </div>
        </div>
    )
}  