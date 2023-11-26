const signupFormHandler = async (event) => {
     event.preventDefault();

     try {
          const username = document.querySelector("#username").value.trim();

          const email = document.querySelector("#emailSignUp").value.trim();

          const password = document.querySelector("#passwordSignUp").value.trim();

          const logInErr = document.querySelector("#logInErr");

          if (!username || !email || !password) {
               logInErr.style.display = "block";
               logInErr.textContent = "Please enter a valid name, email and password.";
               return;
          }

          if (username && email && password) {
               logInErr.style.display = "none";
               const response = await fetch("/api/users/", {
                    method: "POST",
                    body: JSON.stringify({ username, password, email }),
                    headers: { "Content-Type": "application/json" },
               });
               console.log(response.body);
               console.log(response);

               if (!response.ok) {
                    const responseBody = await response.json();
                    logInErr.style.display = "block";
                    logInErr.textContent = responseBody.message;
                    return;
               }

               document.location.replace(document.referrer || "/");
          }
     } catch (err) {
          console.log(err);
     }
};

document.addEventListener("DOMContentLoaded", () => {
     document.querySelector("#formSignUp").addEventListener("submit", signupFormHandler);
});

// document.querySelector("#formSignUp").addEventListener("submit", signupFormHandler);
