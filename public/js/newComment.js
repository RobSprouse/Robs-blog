// COMMENT: script for the newComment.handlebars page

// COMMENT: function to handle the adding of a comment
const addCommentHandler = async (event) => {
     event.preventDefault();

     const comment_text = document.querySelector("#comment-text").value.trim();
     const blogId = document.querySelector("#add-comment").getAttribute("data-id");

     if (comment_text) {
          const response = await fetch(`/addComment/${blogId}`, {
               method: "POST",
               body: JSON.stringify({ comment_text }),
               headers: { "Content-Type": "application/json" },
          });
          console.log("this is in addComment", response);
          if (!response.ok) {
               alert("Failed to add comment");
          }
          document.location.replace(`/blogs/${blogId}`);
     }
};

// COMMENT: event listener for the add comment form
document.querySelector("#add-comment-form").addEventListener("submit", addCommentHandler);
