// COMMENT: importing required modules
import express from "express";
import { User } from "../../models/index.js";

// COMMENT: Creating a new router instance
const router = express.Router();

// COMMENT: Route to create a new user
router.post("/", async (req, res) => {
     try {
          const newUser = new User();
          newUser.username = req.body.username;
          newUser.email = req.body.email;
          newUser.password = req.body.password;
          await newUser.save();

          req.session.save(() => {
               req.session.user_id = newUser.id;
               req.session.loggedIn = true;
               res.status(200).json(newUser);
          });
     } catch (err) {
          if (err.name === "SequelizeUniqueConstraintError") {
               res.status(400).json({ message: "Username or email already exists." });
          } else {
               res.status(500).json(err);
          }
     }
});

// COMMENT: Route to login a user
router.post("/login", async (req, res) => {
     try {
          const userData = await User.findOne({ where: { email: req.body.email } });

          if (!userData) {
               res.status(400).json({ message: "Incorrect username or password, please try again" });
               return;
          }

          const validPassword = userData.checkPassword(req.body.password);

          if (!validPassword) {
               res.status(400).json({ message: "Incorrect username or password, please try again" });
               return;
          }
          console.log("User logged in");
          req.session.save(() => {
               req.session.user_id = userData.id;
               req.session.loggedIn = true;
               res.json({ user: userData.email, message: "You are now logged in!" });
          });
     } catch (err) {
          res.status(400).json(err);
     }
});

// COMMENT: Route to logout a user
router.post("/logout", (req, res) => {
     console.log("logout");
     if (req.session.loggedIn) {
          req.session.destroy(() => {
               res.status(204).end();
          });
     } else {
          res.status(404).end();
     }
});

// COMMENT: Exporting router instance
export default router;
