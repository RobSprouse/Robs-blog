// COMMENT: importing required modules
import express from "express";
import { Blog, User, Comment } from "../models/index.js";
import withAuth from "../utils/auth.js";

// COMMENT: creating a router instance
const router = express.Router();

// COMMENT: signup route
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

// COMMENT: homepage route that renders all blogs
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

// COMMENT: dashboard route that renders all blogs created by the logged in user
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

// COMMENT: new blog route
router.get("/newblog", withAuth, (req, res) => {
     res.render("newblog", {
          loggedIn: req.session.loggedIn,
     });
});

// COMMENT: login route
router.get("/login", (req, res) => {
     if (req.session.loggedIn) {
          res.redirect("/");
          return;
     }

     res.render("login", {
          loggedIn: req.session.loggedIn,
     });
});

// COMMENT: get a single blog by id
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
     } catch (err) {
          res.status(500).json(err);
     }
});

// COMMENT: edit blog route that renders the edit blog page
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
     } catch (err) {
          res.status(500).json(err);
     }
});

// COMMENT: add comment route
router.post("/addComment/:id", withAuth, async (req, res) => {
     try {
          const newComment = new Comment();
          newComment.comment_text = req.body.comment_text;
          newComment.user_id = req.session.user_id;
          newComment.blog_id = req.params.id;
          await newComment.save();

          res.status(200).json(newComment);
     } catch (err) {
          res.status(400).json(err);
     }
});

// COMMENT: edit comment route
router.get("/blogs/:id/comment", withAuth, async (req, res) => {
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
          res.render("newComment", {
               blog,
               loggedIn: req.session.loggedIn,
          });
     } catch (err) {
          res.status(500).json(err);
     }
});

// COMMENT: catch all route that are not defined
router.get("*", (req, res) => {
     res.render("homepage", {
          loggedIn: req.session.loggedIn,
     });
});

// COMMENT: exporting router
export default router;
