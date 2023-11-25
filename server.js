// import path from "path";
import express from "express";
import session from "express-session";
import exphbs from "express-handlebars";
import router from "./controllers/index.js";
import formateDate from "./utils/helpers.js";
import sequelize from "./config/connection.js";
import connectSessionSequelize from "connect-session-sequelize";
import dotenv from "dotenv";
dotenv.config();

// COMMENT: added ti see if it will work
// import { fileURLToPath } from "url";
// import { dirname } from "path";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const SequelizeStore = connectSessionSequelize(session.Store);

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers: { formateDate } });

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
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

app.use(router);

sequelize
     .sync({ force: false })
     .then(() => {
          app.listen(PORT, () => console.log("Now listening"));
     })
     .catch((error) => {
          console.error("Failed to start server: ", error);
     });
