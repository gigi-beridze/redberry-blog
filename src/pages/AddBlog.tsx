import { Link } from "react-router-dom"
import Uploader from "../components/ui/uploader";

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
            <div className="add-blog-form">
                <div className="form-title">
                    <span>ბლოგის დამატება</span>
                </div>
                <div className="form-add-image">
                    <span>ატვირთეთ ფოტო</span>
                    <input type="file" />
                </div>
                <div className="form-author-title">
                    <div className="form-author">
                        <label>
                            ავტორი*
                            <input type="text" placeholder="შეიყვანეთ ავტორი" />   
                        </label>               
                    </div>
                    <div className="form-title">
                        <label>
                            სათაური*
                            <input type="text" placeholder="შეიყვანეთ სათაური" />   
                        </label>               
                    </div>
                </div>
                <div className="form-description">
                    <label>
                        აღწერა*
                        <textarea placeholder="შეიყვანეთ აღწერა"></textarea>
                    </label>
                </div>
            </div>

            <Uploader />
        </div>
    );
};