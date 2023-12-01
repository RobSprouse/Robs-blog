// COMMENT: imports required modules
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.js";

// COMMENT: creates a Blog model
class Blog extends Model {}
Blog.init(
     {
          id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               primaryKey: true,
               autoIncrement: true,
          },
          title: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          content: {
               type: DataTypes.TEXT,
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
     },
     {
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: "blog",
     }
);

// COMMENT: exports the Blog model
export default Blog;
