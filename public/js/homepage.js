// TODO: add event listener to get the blog post id from clicking on the blogs title and the fetch request to get the blog post which handles the rendering of the blog post page

const viewBlog = async (event) => {
     event.preventDefault();
     const blogId = event.target.getAttribute("id");
     console.log(blogId);
     document.location.replace(`/${blogId}`);
};

document.querySelectorAll(".blog-title").forEach((blog) => {
     blog.addEventListener("click", viewBlog);
});
