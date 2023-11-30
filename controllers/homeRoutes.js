import express from "express";
import { Blog, User, Comment } from "../models/index.js";
import withAuth from "../utils/auth.js";
import formateDate from "../utils/helpers.js";

const router = express.Router();

router.get("/signup", async (req, res) => {
     try {
          if (req.session.loggedIn) {
               res.redirect("/");
               return;
          }
          res.render("signup");
     } catch (err) {
          res.status(500).json(err);
     }
});

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
               formateDate,
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

router.get("/blogs/:id", async (req, res) => {
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
          res.render("blog", {
               blog,
               loggedIn: req.session.loggedIn,
               loggedInUser_id: req.session.user_id,
          });
          console.log(blog);
     } catch (err) {
          res.status(500).json(err);
     }
});
// TODO: make sure this route is working
// FIXME:  see if this works
router.get("/blogs/edit/:id", withAuth, async (req, res) => {
     try {
          const blogData = await Blog.findByPk(req.params.id, {
               include: [
                    {
                         model: User,
                         attributes: ["username"],
                    },
               ],
          });

          const blog = blogData.get({ plain: true });
          res.render("editBlog", {
               blog,
               loggedIn: req.session.loggedIn,
          });
          console.log(blog);
     } catch (err) {
          res.status(500).json(err);
     }
});

router.get("*", (req, res) => {
     res.render("homepage", {
          loggedIn: req.session.loggedIn,
     });
});

export default router;
