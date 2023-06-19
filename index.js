import express, { urlencoded } from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from "bcrypt";

import database from "./server-src/config/databaseConnection.js";
import { authenticationMiddleware } from "./server-src/middleware/authentication.js";
import User from "./server-src/models/user.js";
import authRoutes from "./server-src/routes/auth.js";
import dashboardRoutes from "./server-src/routes/dashboard.js";

// Initialize Express app

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

// Configure Passport

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne( { $or: [{username: username}, {email: username}] } );
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// Configure Express middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// ROUTES

app.use("/auth", authRoutes);
app.use("/dashboard", authenticationMiddleware, dashboardRoutes);

// Start the server

app.listen(PORT, 'localhost', err => {
    if (err) {
        console.log(err);
    } else {
    console.log("Backend server started at ", PORT);
    }
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
});
