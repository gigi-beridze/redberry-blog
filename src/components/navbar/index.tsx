import { useState } from "react";
import { Button } from "../ui/button"
import { Popup } from "../ui/popup";
import { Link } from 'react-router-dom';

export const Navbar = () => {
    const [isPopupVisible, setPopupVisibility] = useState(false);

  const openPopup = () => setPopupVisibility(true);
  const closePopup = () => setPopupVisibility(false);

    return (
        <div className="navbar">
            <div className="container">
                <Link to="/">
                    <img src="/logo.png" alt="logo" />
                </Link>
                <Button text="შესვლა" onClick={openPopup} />
                {isPopupVisible && <Popup onClose={closePopup} />}
            </div>
        </div>
    )
}  