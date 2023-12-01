// COMMENT: helper function to check if the user is logged in
const withAuth = (req, res, next) => {
     // If the user is not logged in, redirect the request to the login route
     if (!req.session.loggedIn) {
          res.redirect("/login");
     } else {
          next();
     }
};

// COMMENT: export the function
export default withAuth;
