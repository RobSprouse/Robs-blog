const loginFormHandler = async (event) => {
     console.log("Submit button clicked"); // This will log the message when submit is clicked

     event.preventDefault();

     const email = document.querySelector("#emailLogin").value.trim();
     const password = document.querySelector("#passwordLogin").value.trim();

     if (email && password) {
          const response = await fetch("/api/users/login", {
               method: "POST",
               body: JSON.stringify({ email, password }),
               headers: { "Content-Type": "application/json" },
          });

          if (response.ok) {
               console.log("User logged in");
               document.location.replace(document.referrer || "/");
          } else {
               console.log("User not logged in");
          }
     }
};

document.querySelector("#formLogIn").addEventListener("submit", loginFormHandler);
