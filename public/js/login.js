// COMMENT: script for the login.handlebars page

// COMMENT: function to handle the login form
const loginFormHandler = async (event) => {
     event.preventDefault();

     const email = document.querySelector("#emailLogin").value.trim();
     const password = document.querySelector("#passwordLogin").value.trim();
     const logInErr = document.querySelector("#logInErr");

     if (!email || !password) {
          logInErr.style.display = "block";
          logInErr.textContent = "Please enter a valid email and password.";
          return;
     }

     if (email && password) {
          logInErr.style.display = "none";
          const response = await fetch("/api/users/login", {
               method: "POST",
               body: JSON.stringify({ email, password }),
               headers: { "Content-Type": "application/json" },
          });

          if (!response.ok) {
               const responseBody = await response.json();
               logInErr.style.display = "block";
               logInErr.textContent = responseBody.message;
               return;
          }

          document.location.replace(document.referrer || "/");
          window.location.reload();
     }
};

// COMMENT: calls the loginFormHandler function when the login form is submitted
document.querySelector("#formLogIn").addEventListener("submit", loginFormHandler);
