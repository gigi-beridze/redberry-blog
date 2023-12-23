export const BlogDetail = (data: any) => {
    const blog = data.data;
    return (
        <div className="detail-blog">
            <img  className="detail-blog-image" src={blog.image} alt="blog_image" />
            <div className="detail-blog-texts">
                <span className="detail-blog-author">{blog.author}</span>
                <span className="detail-blog-info">{blog.publish_date}&nbsp; • &nbsp;{blog.email}</span>
                <span className="detail-blog-title">{blog.title}</span>
                <span className="detail-blog-description">{blog.description}</span>
            </div>
        </div>
    )
}