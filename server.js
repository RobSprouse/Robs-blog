// COMMENT: imports required modules
import express from "express";
import session from "express-session";
import exphbs from "express-handlebars";
import router from "./controllers/index.js";
import sequelize from "./config/connection.js";
import connectSessionSequelize from "connect-session-sequelize";
import dotenv from "dotenv";
import { formatDate, isEqual } from "./utils/helpers.js";

// COMMENT: loads environment variables from .env file
dotenv.config();

// COMMENT: initializes express app
const app = express();
const PORT = process.env.PORT || 3001;
const SequelizeStore = connectSessionSequelize(session.Store);

// COMMENT: sets up handlebars.js engine with custom helpers
const hbs = exphbs.create({
     helpers: {
          formatDate,
          isEqual,
     },
});

// COMMENT: sets up session and connect-session-sequelize
const sess = {
     secret: process.env.SESSION_SECRET,
     cookie: {
          maxAge: 600000,
          httpOnly: false,
          secure: false, // Set to false in development
          sameSite: "lax", // Set to lax or none in development
     },
     resave: false,
     saveUninitialized: true,
     store: new SequelizeStore({
          db: sequelize,
     }),
};

// COMMENT: sets up session middleware
app.use(session(sess));

// COMMENT: sets up handlebars.js engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// COMMENT: sets up express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// COMMENT: sets up referrer policy, see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
app.use((req, res, next) => {
     res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
     next();
});
app.use(router);

// COMMENT: syncs sequelize models to the database, then starts the server
(async () => {
     try {
          await sequelize.sync({ force: false });
          app.listen(PORT, () => console.log("Now listening"));
     } catch (error) {
          console.error("Failed to start server: ", error);
     }
})();
