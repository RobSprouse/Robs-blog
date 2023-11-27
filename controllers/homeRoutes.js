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

router.get("/dashboard", withAuth, async (req, res) => {
     try {
          const blogData = await Blog.findAll({
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

          const blogs = blogData.map((blog) => blog.get({ plain: true }));

          res.render("dashboard", {
               blogs,
               loggedIn: req.session.loggedIn,
          });
     } catch (err) {
          res.status(500).json(err);
     }
});

router.get("/newblog", withAuth, (req, res) => {
     res.render("newBlog", {
          loggedIn: req.session.loggedIn,
     });
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

router.get("/:id", async (req, res) => {
     try {
          const blogData = await Blog.findByPk(req.params.id, {
               include: [
                    {
                         model: User,
                         attributes: ["username"],
                    },
                    {
                         model: Comment,
                         attributes: ["id", "comment_text", "date_created", "user_id"],
                         include: {
                              model: User,
                              attributes: ["username"],
                         },
                    },
               ],
          });

          const blog = blogData.get({ plain: true });
          console.log(blog);
          res.render("blog", {
               blog,
               loggedIn: req.session.loggedIn,
          });
     } catch (err) {
          res.status(500).json(err);
     }
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
