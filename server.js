const express = require("express");
const path = require("path");
const cors = require("cors");

require("dotenv").config();

const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("./config/passport/index");
const dbConnect = require("./db/connect");
const corsOptions = require("./config/cors");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
    session({
        secret: "keyboard cat",
        store: MongoStore.create({ client: dbConnect.getClient() }),
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // 2 weeks maxAge
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors(corsOptions));

app.use("/api", require("./routes/userRoutes"));
app.use("/api", require("./routes/favoriteRoutes"));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("manga-app/build"));
}

if (process.env.NODE_ENV === "production") {
    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "manga_app/build/index.html"));
    });
}

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
