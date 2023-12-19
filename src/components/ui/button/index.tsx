import { CustomButtonProps } from "../../../models/global";

export const Button: React.FC<CustomButtonProps> = ({ text, ...props }) => {

    return (
        <button {...props} className="primary-btn">{text}</button>
    )
}