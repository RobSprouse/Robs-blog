async function deleteBlog(event) {
     const blogId = event.target.getAttribute("data-id");
     await fetch(`/api/blogs/${blogId}`, {
          method: "DELETE",
          headers: {
               "Content-Type": "application/json",
          },
     });
     document.location.replace("/dashboard");
}

// COMMENT: added this

const viewBlog = async (event) => {
     event.preventDefault();
     const blogId = event.target.getAttribute("id");
     document.location.replace(`/blogs/${blogId}`);
};

document.querySelectorAll(".blog-title").forEach((blog) => {
     blog.addEventListener("click", viewBlog);
});

document.querySelectorAll("#delete-blog").forEach((blog) => {
     blog.addEventListener("click", deleteBlog);
});
