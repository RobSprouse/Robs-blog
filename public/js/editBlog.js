// TODO: create a function to edit a blog post and send a PUT request to update the blog post
// FIXME:  see if this works
const editBlogHandler = async (event) => {
     event.preventDefault();
     const title = document.querySelector(".blog-title").value.trim();
     const content = document.querySelector(".blog-content").value.trim();
     const blogId = document.querySelector(".blog-id").value.trim();

     if (title && content) {
          const response = await fetch(`api/dashboard/${blogId}`, {
               method: "PUT",
               body: JSON.stringify({ title, content }),
               headers: { "Content-Type": "application/json" },
          });

          if (response.ok) {
               document.location.replace("/dashboard");
               window.location.reload();
          } else {
               alert("Failed to create blog");
          }
     }

     document.location.replace("/dashboard");
};

document.querySelectorAll("#edit-blog").forEach((blog) => {
     blog.addEventListener("click", editBlogHandler);
});
