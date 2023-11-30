const editBlogHandler = async (event) => {
     event.preventDefault();
     const titleElement = document.querySelector("#title");
     const title = titleElement.value.trim();
     const content = document.querySelector("#content").value.trim();
     const blogId = titleElement.getAttribute("data-id");

     if (title && content) {
          const response = await fetch(`/api/blogs/${blogId}`, {
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

document.querySelector("#editBlogForm").addEventListener("submit", editBlogHandler);
