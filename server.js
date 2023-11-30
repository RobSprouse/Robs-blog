import express from "express";
import session from "express-session";
import exphbs from "express-handlebars";
import router from "./controllers/index.js";
import sequelize from "./config/connection.js";
import connectSessionSequelize from "connect-session-sequelize";
import dotenv from "dotenv";
import { formatDate, isEqual } from "./utils/helpers.js";
import section from "./utils/helpers.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const SequelizeStore = connectSessionSequelize(session.Store);

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({
     helpers: {
          formatDate,
          isEqual,
          section,
     },
});

const sess = {
     secret: process.env.SESSION_SECRET,
     cookie: {
          maxAge: 600000,
          httpOnly: true,
          secure: true,
          sameSite: "lax",
     },
     resave: false,
     saveUninitialized: true,
     store: new SequelizeStore({
          db: sequelize,
     }),
};

app.use(session(sess));
app.use((req, res, next) => {
     res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
     next();
});

// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(router);

(async () => {
     try {
          await sequelize.sync({ force: false });
          app.listen(PORT, () => console.log("Now listening"));
     } catch (error) {
          console.error("Failed to start server: ", error);
     }
})();
