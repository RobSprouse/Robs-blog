// COMMENT: Importing required modules
import Express from "express";
import { Blog } from "../../models/index.js";
import withAuth from "../../utils/auth.js";

// COMMENT: Creating a new router instance
const router = Express.Router();

// COMMENT: Route to delete a blog post
router.delete("/:id", withAuth, async (req, res) => {
     try {
          const blogData = await Blog.destroy({
               where: {
                    id: req.params.id,
               },
          });

          if (!blogData) {
               res.status(404).json({ message: "No blog found with this id!" });
               return;
          }

          res.status(200).json(blogData);
     } catch (err) {
          console.log(err);
          res.status(500).json(err);
     }
});

// COMMENT: Route to create update a blog post
router.put("/:id", withAuth, async (req, res) => {
     try {
          const blogData = await Blog.update(
               {
                    title: req.body.title,
                    content: req.body.content,
               },
               {
                    where: {
                         id: req.params.id,
                    },
               }
          );

          if (!blogData) {
               res.status(404).json({ message: "No blog found with this id!" });
               return;
          }

          res.status(200).json(blogData);
     } catch (err) {
          console.log(err);
          res.status(500).json(err);
     }
});

// COMMENT: Exporting router instance
export default router;
