const signupFormHandler = async (event) => {
     event.preventDefault();

     const userName = document.querySelector("#nameSignUp").value.trim();
     const email = document.querySelector("#emailSignUp").value.trim();
     const password = document.querySelector("#passwordSignUp").value.trim();

     if (!userName || !email || !password) {
          logInErr.style.display = "block";
          logInErr.textContent = "Please enter a valid name, email and password.";
          return;
     }

     if (userName && email && password) {
          logInErr.style.display = "none";
          const response = await fetch("/api/users/", {
               method: "POST",
               body: JSON.stringify({ userName, password, email }),
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
};
document.querySelector("#formSignUp").addEventListener("submit", signupFormHandler);
