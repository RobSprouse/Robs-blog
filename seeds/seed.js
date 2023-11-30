import sequelize from "../config/connection.js";
import { User, Blog, Comment } from "../models/index.js"; // Import index.js

import userData from "./userData.js";
import blogData from "./blogData.js";
import commentData from "./commentData.js";

const seedDatabase = async () => {
     try {
          await sequelize.sync({ force: true });

          // Clear the database
          await Promise.all([User.destroy({ where: {} }), Blog.destroy({ where: {} }), Comment.destroy({ where: {} })]);

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

          // Wait for all blogs to be created before creating any comments
          await Promise.all(
               commentData.map(async (comment) => {
                    await Comment.create({
                         ...comment,
                         user_id: comment.userId,
                         blog_id: comment.blogId,
                    });
               })
          );

          console.log("Database seeded successfully.");

          process.exit(0);
     } catch (err) {
          console.log("❓ ~ file: seed.js:39 ~ seedDatabase ~ err:", err);

          process.exit(0);
     }
};

seedDatabase();
