import express from "express";
import { Blog } from "../../models/index.js";
import withAuth from "../../utils/auth.js";
import formateDate from "../../utils/helpers.js";

const router = express.Router();

router.post("/", withAuth, async (req, res) => {
     try {
          const newBlog = new Blog();
          newBlog.title = req.body.title;
          newBlog.content = req.body.content;
          newBlog.user_id = req.session.user_id;
          newBlog.date_created = formateDate(new Date());
          await newBlog.save();

          res.status(200).json(newBlog);
     } catch (err) {
          res.status(500).json(err);
     }
});

export default router;
