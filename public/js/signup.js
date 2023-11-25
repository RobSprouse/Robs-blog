const signupFormHandler = async (event) => {
     event.preventDefault();

     const userName = document.querySelector("#nameSignup").value.trim();
     const email = document.querySelector("#emailSignup").value.trim();
     const password = document.querySelector("#passwordSignup").value.trim();

     if (userName && email && password) {
          const response = await fetch("/api/users", {
               method: "POST",
               body: JSON.stringify({ userName, email, password }),
               headers: { "Content-Type": "application/json" },
          });
          if (response.ok) {
               console.log("User created");
               document.location.replace(document.referrer || "/");
          } else {
               console.log("User not created");
               alert(response.statusText);
          }
     }
};
