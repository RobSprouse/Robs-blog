const viewBlog = async (event) => {
     event.preventDefault();
     const blogId = event.target.getAttribute("id");
     document.location.replace(`/blogs/${blogId}`);
};

document.querySelectorAll(".blog-title").forEach((blog) => {
     blog.addEventListener("click", viewBlog);
});
