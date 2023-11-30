import Express from "express";
import { Blog } from "../../models/index.js";
import withAuth from "../../utils/auth.js";
import formateDate from "../../utils/helpers.js";

const router = Express.Router();

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
          alert(err);
          res.status(500).json(err);
     }
});
// FIXME: see if this works
// TODO: create a route to update a blog's title and content
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
          alert(err);
          res.status(500).json(err);
     }
});


export default router;
