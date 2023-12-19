export interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    onClick?: () => void;
}