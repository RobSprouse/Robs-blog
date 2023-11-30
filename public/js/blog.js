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

// TODO: create a function to handle the clicking of the edit button to render the edit blog page

async function editBlog(event) {
     const blogId = event.target.getAttribute("data-id");
     document.location.replace(`/blogs/edit/${blogId}`);
}


const viewBlog = async (event) => {
     event.preventDefault();
     const blogId = event.target.getAttribute("data-id");
     document.location.replace(`/blogs/${blogId}`);
};


document.querySelectorAll(".blog-title").forEach((blog) => {
     blog.addEventListener("click", viewBlog);
});

document.querySelectorAll("#delete-blog").forEach((blog) => {
     blog.addEventListener("click", deleteBlog);
});

document.querySelectorAll("#edit-blog").forEach((blog) => {
     blog.addEventListener("click", editBlog);
});
