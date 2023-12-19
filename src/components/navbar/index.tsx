import { ButtonHTMLAttributes, useState } from "react";
import { Button } from "../ui/button"
import { Popup } from "../ui/popup";
interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
  }
export const Navbar = () => {
    const [isPopupVisible, setPopupVisibility] = useState(false);

  const openPopup = () => setPopupVisibility(true);
  const closePopup = () => setPopupVisibility(false);

    return (
        <div className="navbar">
            <div className="container">
                <img src="/logo.png" alt="logo" />
                <Button text="შესვლა" onClick={openPopup} />
                {isPopupVisible && <Popup onClose={closePopup} />}
            </div>
        </div>
    )
}  