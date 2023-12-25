export interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    onClick?: () => void;
}
export interface PopupProps {
    onClose: () => void;
} 
export interface Category {
    id: number;
    title: string;
    text_color: string;
    background_color: string;
}