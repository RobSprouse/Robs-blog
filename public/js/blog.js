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

document.querySelectorAll("#delete-blog").forEach((blog) => {
     blog.addEventListener("click", deleteBlog);
});
