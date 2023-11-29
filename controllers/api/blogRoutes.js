import Express from "express";
import { Blog } from "../../models/index.js";
import withAuth from "../../utils/auth.js";
import formateDate from "../../utils/helpers.js";

const router = Express.Router();

// TODO: route to delete a blog post
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

router.get("*", (req, res) => {
     res.render("homepage", {
          loggedIn: req.session.loggedIn,
     });
});

export default router;
