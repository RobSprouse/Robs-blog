import express from "express";
import { Blog, User, Comment } from "../models/index.js";
import withAuth from "../utils/auth.js";

const router = express.Router();

router.get("/", async (_, res) => {
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

     res.render("login");
});

router.get("/signup", (req, res) => {
     if (req.session.loggedIn) {
          res.redirect("/");
          return;
     }

     res.render("signup");
});

export { router as homeRoutes };
