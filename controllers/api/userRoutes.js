import express from "express";
import { User } from "../../models/index.js";

const router = express.Router({ mergeParams: true });

router.post("/", async (req, res) => {
     try {
          const userData = await User.create(req.body);

          req.session.save(() => {
               req.session.user_id = userData.id;
               req.session.loggedIn = true;
               res.status(200).json(userData);
          });
     } catch (err) {
          res.status(400).json(err);
     }
});

router.post("/login", async (req, res) => {
     try {
          console.log(req.body);
          const userData = await User.findOne({ where: { email: req.body.email } });
          console.log("❓ ~ file: userRoutes.js:25 ~ router.post ~ userData:", userData);

          if (!userData) {
               console.log("Incorrect username or password, please try again");
               res.status(400).json({ message: "Incorrect username or password, please try again" });
               return;
          }

          const validPassword = await userData.checkPassword(req.body.password);

          if (!validPassword) {
               console.log("Incorrect username or password, please try again");
               res.status(400).json({ message: "Incorrect username or password, please try again" });
               return;
          }
          console.log("User logged in");
          req.session.save(() => {
               req.session.user_id = userData.id;
               req.session.loggedIn = true;
               console.log(req.session);
               res.json({ user: userData, message: "You are now logged in!" });
          });
     } catch (err) {
          res.status(400).json(err);
     }
});

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

export default router;
