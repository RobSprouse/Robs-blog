// COMMENT: Importing required modules
import express from "express";
import { Blog } from "../../models/index.js";
import withAuth from "../../utils/auth.js";
import { formatDate, isEqual } from "../../utils/helpers.js";

// COMMENT: Creating a new router instance
const router = express.Router();

// COMMENT: Route to create a new blog post
router.post("/", withAuth, async (req, res) => {
     try {
          const newBlog = new Blog();
          newBlog.title = req.body.title;
          newBlog.content = req.body.content;
          newBlog.user_id = req.session.user_id;
          newBlog.date_created = formatDate(new Date());
          await newBlog.save();

          res.status(200).json(newBlog);
     } catch (err) {
          res.status(500).json(err);
     }
});

// COMMENT: exporting router instance
export default router;
