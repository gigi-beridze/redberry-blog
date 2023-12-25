import { useEffect, useState } from "react";
import { Button } from "../ui/button"
import { Popup } from "../ui/popup";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const [isPopupVisible, setPopupVisibility] = useState(false),
          [isLoginned, setIsLoginned] = useState<boolean>(false),
          openPopup = () => setPopupVisibility(true),
          closePopup = () => setPopupVisibility(false);

    useEffect(() => {
      const storedLoginStatus = localStorage.getItem('isLogined');

      if (storedLoginStatus) {
        setIsLoginned(JSON.parse(storedLoginStatus));
      }
    }, []);
    const navigate = useNavigate();

    const fa = () => {
      navigate('/add-blog');
    }
    


    return (
        <div className="navbar">
            <div className="container">
                <Link to="/">
                    <img src="/logo.png" alt="logo" />
                </Link>
                <Button text={!isLoginned ? 'შესვლა' : 'ბლოგის დამატება'} onClick={!isLoginned ? openPopup : fa} />
                {isPopupVisible && <Popup onClose={closePopup} />}
            </div>
        </div>
    )
}  