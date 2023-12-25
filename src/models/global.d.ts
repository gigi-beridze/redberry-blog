export interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    onClick?: () => void;
}
export interface PopupProps {
    onClose: () => void;
}
  