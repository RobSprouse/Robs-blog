import sequelize from "../config/connection.js";
import User from "../models/User.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import bcrypt from "bcrypt";

import userData from "./userData.js";
import blogData from "./blogData.js";
import commentData from "./commentData.js";

const seedDatabase = async () => {
     try {
          await sequelize.sync({ force: true });

          const users = await User.bulkCreate(userData, {
               individualHooks: true,
               returning: true,
          });

          for (const blog of blogData) {
               await Blog.create({
                    ...blog,
                    user_id: blog.userId,
               });
          }

          for (const comment of commentData) {
               await Comment.create({
                    ...comment,
                    user_id: comment.userId,
                    blog_id: comment.blogId,
               });
          }

          console.log("Database seeded successfully.");

          process.exit(0);
     } catch (err) {
          console.log("❓ ~ file: seed.js:39 ~ seedDatabase ~ err:", err);

          process.exit(0);
     }
};

seedDatabase();
