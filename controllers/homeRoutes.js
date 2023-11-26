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

router.get("/dashboard", async (req, res) => {
     try {
          if (!req.session.loggedIn) {
               res.redirect("/login");
               return;
          }
          // TODO: finish the code for this route, and maybe move 
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

router.get("/signup", (req, res) => {
     if (req.session.loggedIn) {
          res.redirect("/");
          return;
     }

     res.render("signup", {
          loggedIn: req.session.loggedIn,
     });
});

export default router;
