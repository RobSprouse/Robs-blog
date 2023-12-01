// COMMENT: imports required modules
import User from "./User.js";
import Blog from "./Blog.js";
import Comment from "./Comment.js";

// COMMENT: creates associations between the models
User.hasMany(Blog, {
     foreignKey: "user_id",
     onDelete: "CASCADE",
});

User.hasMany(Comment, {
     foreignKey: "user_id",
     onDelete: "CASCADE",
});

Blog.hasMany(Comment, {
     foreignKey: "blog_id",
     onDelete: "CASCADE",
});

Blog.belongsTo(User, {
     foreignKey: "user_id",
});

Comment.belongsTo(User, {
     foreignKey: "user_id",
});

Comment.belongsTo(Blog, {
     foreignKey: "blog_id",
});

// COMMENT: exports the models
export { User, Blog, Comment };
