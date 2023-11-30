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

async function editBlog(event) {
     const blogId = event.target.getAttribute("data-id");
     document.location.replace(`/blogs/edit/${blogId}`);
}

const viewBlog = async (event) => {
     event.preventDefault();
     const blogId = event.target.getAttribute("data-id");
     document.location.replace(`/blogs/${blogId}`);
};

// TODO: create a function to handle a new comment button click to render the new comment page

const newComment = async (event) => {
     event.preventDefault();
     const blogId = event.target.getAttribute("data-id");
     document.location.replace(`/blogs/${blogId}/comment`);
};

const commentButton = document.querySelector("#add-comment");
if (commentButton) {
     commentButton.addEventListener("click", newComment);
}

document.querySelectorAll(".blog-title").forEach((blog) => {
     blog.addEventListener("click", viewBlog);
});

document.querySelectorAll("#delete-blog").forEach((blog) => {
     blog.addEventListener("click", deleteBlog);
});

document.querySelectorAll("#edit-blog").forEach((blog) => {
     blog.addEventListener("click", editBlog);
});
