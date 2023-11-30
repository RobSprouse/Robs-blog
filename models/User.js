import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.js";
import bcrypt from "bcrypt";

class User extends Model {
     checkPassword(loginPw) {
          return bcrypt.compareSync(loginPw, this.password);
     }
}

User.init(
     {
          id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               primaryKey: true,
               autoIncrement: true,
          },
          username: {
               type: DataTypes.STRING,
               allowNull: false,
               unique: true,
          },
          password: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          email: {
               type: DataTypes.STRING,
               allowNull: false,
               unique: true,
               validate: {
                    isEmail: true,
               },
          },
     },
     {
          hooks: {
               beforeCreate: async (newUserData) => {
                    newUserData.password = await bcrypt.hash(newUserData.password, 10);
                    return newUserData;
               },
               beforeUpdate: async (updatedUserData) => {
                    updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                    return updatedUserData;
               },
          },
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: "user",
     }
);

export default User;
