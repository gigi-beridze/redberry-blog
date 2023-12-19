import { Button } from "../button";
import { Input } from "../input";

interface PopupProps {
  onClose: () => void;
}

export const Popup: React.FC<PopupProps> = ({ onClose }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <span>შესვლა</span>
        <Input label="Email Address" id="email" name="email" placeholder="Enter your email" />
        <Button text="შესვლა"/>
      </div>
    </div>
  );
};