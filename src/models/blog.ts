export interface blog {
    id: number;
    author: string;
    categories: Category[];
    description: string;
    image: string;
    publish_date: string;
    title: string;
}
interface blogDetail{
    author: string;
    categories: Category[];
    description: string;
    email: string;
    id: number;
    image: string;
    publish_date: string;
    title: string;
}
export interface blogDetailResponse {
    data: blogDetail;
}  
interface Category {
    id: number;
    title: string;
    text_color: string;
    background_color: string;
}