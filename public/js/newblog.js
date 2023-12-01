// COMMENT: script for the newblog.handlebars page

// COMMENT: function to handle the creation of a new blog post
const newBlogHandler = async (event) => {
     event.preventDefault();
     const title = document.querySelector("#title").value.trim();
     const content = document.querySelector("#content").value.trim();

     if (title && content) {
          const response = await fetch("/api/dashboard/", {
               method: "POST",
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

// COMMENT: event listener for the new blog form
document.querySelector("#editBlogForm").addEventListener("submit", newBlogHandler);

// COMMENT: prevents the user from pressing the enter key in the title field and causing the form to submit
document.getElementById("title").addEventListener("keydown", function (event) {
     if (event.key === "Enter") {
          event.preventDefault();
     }
});
