// COMMENT: script for the homepage.handlebars page

// COMMENT: function to send the user to the individual blog page
const viewBlog = async (event) => {
     event.preventDefault();
     const blogId = event.target.getAttribute("data-id");
     document.location.replace(`/blogs/${blogId}`);
};

// COMMENT: calls the viewBlog function when the blog title is clicked
document.querySelectorAll(".blog-title").forEach((blog) => {
     blog.addEventListener("click", viewBlog);
});
