import User from "./User.js";
import Blog from "./Blog.js";
import Comment from "./Comment.js";

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

export { User, Blog, Comment };
