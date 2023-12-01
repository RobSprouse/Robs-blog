// COMMENT: script for the signup.handlebars page

// COMMENT: function to handle the signup form
const signupFormHandler = async (event) => {
     event.preventDefault();

     try {
          const username = document.querySelector("#username").value.trim();
          const email = document.querySelector("#emailSignUp").value.trim();
          const password = document.querySelector("#passwordSignUp").value.trim();
          const logInErr = document.querySelector("#logInErr");

          // COMMENT: if any of the fields are empty, display an error message
          if (!username || !email || !password) {
               logInErr.style.display = "block";
               logInErr.textContent = "Please enter a valid name, email and password.";
               return;
          }

          // COMMENT: if all fields are filled out, send the data to the database
          if (username && email && password) {
               logInErr.style.display = "none";
               const response = await fetch("/api/users/", {
                    method: "POST",
                    body: JSON.stringify({ username, password, email }),
                    headers: { "Content-Type": "application/json" },
               });

               // COMMENT: if the response is not ok, display an error message from the response body set up in the user-routes.js file
               if (!response.ok) {
                    const responseBody = await response.json();
                    logInErr.style.display = "block";
                    logInErr.textContent = responseBody.message;
                    return;
               }

               document.location.replace("/");
               window.location.reload();
          }
     } catch (err) {
          console.log(err);
     }
};

// COMMENT: event listener for the signup form
document.querySelector("#formSignUp").addEventListener("submit", signupFormHandler);
