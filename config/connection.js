// COMMENT: Importing required modules
import Sequelize from "sequelize";
import dotenv from "dotenv";

// COMMENT: Load environment variables
dotenv.config();

let sequelize;

// COMMENT: Create connection to our database, pass in the MySQL information for username and password
if (process.env.JAWSDB_URL) {
     sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
     sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
          host: "localhost",
          dialect: "mysql",
          port: 3306,
     });
}

// COMMENT: Exporting sequelize
export default sequelize;
