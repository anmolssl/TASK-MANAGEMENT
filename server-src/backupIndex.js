const PORT = process.env.PORT || 3002;
import express, { urlencoded } from "express";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from "bcrypt";

// Initialize Express app

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

// Connect to MongoDB

mongoose.connect('mongodb://127.0.0.1:27017/taskuserDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Define User model

const User = mongoose.model('User', new mongoose.Schema({
    username: {type: String, unique: true},
    email: {type: String, unique: true},
    firstname: String,
    lastname: String,
    password: String
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
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// API ENDPOINTS for Login/Register

app.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ message: 'Login successful.', user: req.user });
});

app.post('/register', async (req, res) => {
    const { firstname, lastname, email, username, password } = req.body;
  
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstname, lastname, email, username, password: hashedPassword });

        await newUser.save();
        req.login(newUser, (err) => {
            if (err) {
                console.error(err);
                console.log(err);
                res.status(500).json({message: "An error occurred while logging in."});
            }
            res.json({ message: "Registration successful." });
        });
    } catch (error) {
        console.error(error);
        console.log(error);
        res.status(500).json({message: "An error occurred while registering the user."});
    }
});

app.get("/dashboard", (req,res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.sendStatus(401);
    }
});

app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'An error occurred while logging out.' });
        }
        res.json({ message: 'Logged out.' });
    });
});

// API ENDPOINTS for Tasks

app.post("/createTask", (req, res) => {
    const {title, description, date, priority} = req.body;
});

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
