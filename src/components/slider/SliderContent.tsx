import { Link } from "react-router-dom";
import { blog } from "../../models/blog";

export const SliderContent = (props: blog) => {
    const { title, description, image, author, publish_date, categories, id } = props;

    return (
       <div className="blogs slider-blog">
        <div className="container slider-blog-container">
            <div className="blog">
                <img src={image} alt="blog_image" />
                <span className="blog-author">{author}</span>
                <span className="blog-date">{publish_date}</span>
                <span className="blog-title">{title}</span>
                <div className="blog-categories">
                    {categories.map((categorie:any) => ( 
                        <button    
                            className="blog-categories-btn"       
                            style={{
                                backgroundColor: categorie.background_color,
                                color: categorie.text_color,
                            }}
                            key={categorie.id}
                        >
                            {categorie.title}
                        </button>
                    ))}
                </div>
                <span className="blog-description">{description}</span>
                <Link to={`/blog/${id}`} className="blog-info-btn">
                    სრულად ნახვა
                    <img style={{ marginLeft: '4px' }} src="/src/assets/arrow.svg" alt="arrow" />
                </Link>
            </div>
       </div>
       </div>
    );
 };