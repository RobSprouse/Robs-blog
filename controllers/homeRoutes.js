import express from "express";
import { Blog, User, Comment } from "../models/index.js";
import withAuth from "../utils/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
     try {
          const blogData = await Blog.findAll({
               include: [
                    {
                         model: User,
                         attributes: ["username"],
                    },
               ],
          });

          const blogs = blogData.map((blog) => blog.get({ plain: true }));

          res.render("homepage", {
               blogs,
               loggedIn: req.session.loggedIn,
          });
     } catch (err) {
          res.status(500).json(err);
     }
});

// TODO: get blog by by user id and display on dashboard
router.get("/dashboard", withAuth, async (req, res) => {
     try {
          const blogByUser = await Blog.findAll({
               where: {
                    user_id: req.session.user_id,
               },
               include: [
                    {
                         model: User,
                         attributes: ["username"],
                    },
               ],
          });

          const blogs = blogByUser.map((blog) => blog.get({ plain: true }));

          res.render("dashboard", {
               blogs,
               loggedIn: req.session.loggedIn,
          });
     } catch (err) {
          res.status(500).json(err);
     }
});

router.get("/login", (req, res) => {
     if (req.session.loggedIn) {
          res.redirect("/");
          return;
     }

     res.render("login", {
          loggedIn: req.session.loggedIn,
     });
});

router.get("/signup", withAuth, (req, res) => {
     res.render("signup", {
          loggedIn: req.session.loggedIn,
     });
});

// TODO: find existing users by username and email to compare in front end

// router.get("/users", async (req, res) => {
//      try {
//           const userData = await User.findAll({
//                attributes: { exclude: ["password"] },
//           });
//           res.status(200).json(userData);
//      } catch (err) {
//           res.status(500).json(err);
//      }
// });

export default router;
