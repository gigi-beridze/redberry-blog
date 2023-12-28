import { Link } from "react-router-dom"
import { AddBlogForm} from "../components/add-blog";

export const AddBlog = () => {
    return (
        <div className="add-blog">
            <div className="navbar">
                <div className="container">
                    <Link to="/">
                        <img src="/logo.png" alt="logo" />
                    </Link>
                </div>
            </div>
            <AddBlogForm />
        </div>
    );
};