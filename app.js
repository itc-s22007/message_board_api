import express from "express";
import session from "express-session";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import passport from "passport";
import scryptConfig from "./ui/scrypt.js";
import cors from "cors";

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import messageRouter from "./routes/message.js";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(import.meta.dirname, "public")));

app.use(session({
    secret: "78N2uxAa5LfDrfSX2yIZRnocY5YXxHZmAFk2MqQCr2Md9CdH",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    const messages = req.session.messages || [];
    res.locals.messages = messages;
    res.locals.hasMessages = !!messages.length;
    req.session.messages = [];
    next();
});

app.use(passport.authenticate("session"));
scryptConfig(passport);

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/message", messageRouter);

app.use((req, res, next) => {
    res.status(404).json({message: "not found."});
});

const errorHandler = (err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.render("error");
};
app.use(errorHandler);

export default app;

