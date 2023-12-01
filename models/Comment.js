// COMMENT: imports required modules
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.js";

// COMMENT: creates a Comment model
class Comment extends Model {}
Comment.init(
     {
          id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               primaryKey: true,
               autoIncrement: true,
          },
          comment_text: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          date_created: {
               type: DataTypes.DATE,
               allowNull: false,
               defaultValue: DataTypes.NOW,
          },
          user_id: {
               type: DataTypes.INTEGER,
               references: {
                    model: "user",
                    key: "id",
               },
          },
          blog_id: {
               type: DataTypes.INTEGER,
               references: {
                    model: "blog",
                    key: "id",
               },
          },
     },
     {
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: "comment",
     }
);

// COMMENT: exports the Comment model
export default Comment;
