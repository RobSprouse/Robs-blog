// COMMENT: imports the required modules
import sequelize from "../config/connection.js";
import { User, Blog, Comment } from "../models/index.js";
import userData from "./userData.js";
import blogData from "./blogData.js";
import commentData from "./commentData.js";

// COMMENT: function to seed the database
const seedDatabase = async () => {
     try {
          // Sync all models to the database, dropping all existing tables
          await sequelize.sync({ force: true });

          // Bulk create user data
          const users = await User.bulkCreate(userData, {
               individualHooks: true,
               returning: true,
          });

          // Create blogs with the user data attached
          for (const blog of blogData) {
               await Blog.create({
                    ...blog,
                    user_id: blog.userId,
               });
          }

          // Create comments with the user data attached
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

// COMMENT: call the seedDatabase function
seedDatabase();
