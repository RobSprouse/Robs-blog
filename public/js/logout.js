// COMMENT: handles the logout of a user, script for the main.handlebars page that's utilized on every page when a user is logged in

// COMMENT: function to handle the logout of a user
const logout = async () => {
     const response = await fetch("/api/users/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
     });

     if (response.ok) {
          document.location.replace("/");
     } else {
          alert(response.statusText);
     }
};

// COMMENT: calls the logout function when the logout link is clicked
document.querySelector("#logoutLink").addEventListener("click", logout);
