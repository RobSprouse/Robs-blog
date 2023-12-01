// COMMENT: script for blog.handlebars and dashboard.handlebars,

// COMMENT: handles the deletion of a blog post
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

// COMMENT: triggers the edit blog page
async function editBlog(event) {
     const blogId = event.target.getAttribute("data-id");
     document.location.replace(`/blogs/edit/${blogId}`);
}

// COMMENT: triggers the view blog page
const viewBlog = async (event) => {
     event.preventDefault();
     const blogId = event.target.getAttribute("data-id");
     document.location.replace(`/blogs/${blogId}`);
};

// COMMENT: triggers the new comment page
const newComment = async (event) => {
     event.preventDefault();
     const blogId = event.target.getAttribute("data-id");
     document.location.replace(`/blogs/${blogId}/comment`);
};

// COMMENT: triggers the edit comment page
const commentButtons = document.querySelectorAll(".add-comment");
commentButtons.forEach((button) => {
     button.addEventListener("click", newComment);
});

// COMMENT: calls the viewBlog function when the blog title is clicked
document.querySelectorAll(".blog-title").forEach((blog) => {
     blog.addEventListener("click", viewBlog);
});

// COMMENT: calls the deleteBlog function when the delete button is clicked
document.querySelectorAll("#delete-blog").forEach((blog) => {
     blog.addEventListener("click", deleteBlog);
});

// COMMENT: calls the editBlog function when the edit button is clicked
document.querySelectorAll("#edit-blog").forEach((blog) => {
     blog.addEventListener("click", editBlog);
});
