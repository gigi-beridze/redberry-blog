export interface blog {
    id: number;
    author: string;
    categories: Category[];
    description: string;
    image: string;
    publish_date: string;
    title: string;
}
interface Category {
    id: number;
    title: string;
    text_color: string;
    background_color: string;
}  