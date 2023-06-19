import express from "express";
import passport from "passport";
import multer from "multer";
import fs, { unlink } from "fs";
import { promisify } from "util";

import User from "../models/user.js"

const router = express.Router();

const unlinkAsync = promisify(fs.unlink);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname)
    }
});

const upload = multer({ storage: storage});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ message: 'Login successful.', user: req.user });
});

router.post('/register', async (req, res) => {
    const { firstname, lastname, email, username, password } = req.body;

    try {
        let user = await User.findOne({ $or: [{email}, {username}] });
        if (user) {
            return res.status(400).json({ message: "Email or username already taken." });
        }

        const newUser = new User({ firstname, lastname, email, username, password });

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

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'An error occurred while logging out.' });
        }
        res.json({ message: 'Logged out.' });
    });
});

router.post("/updateProfile", upload.single('profilepic'), async (req,res) => {
    const { userId } = req.body;
    //const { userId } = req.body;
    const { firstname, lastname } = req.body;
    
    try {
        // await User.updateOne({ _id: userId }, { firstname: firstname, lastname: lastname });
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");

        if (req.file) {
            if (user.profilepic) {
                await unlinkAsync(user.profilepic);
                user.profilepic = req.file.path;
            } else {
                user.profilepic = req.file.path;
            }
        }

        firstname ? user.firstname = firstname : null;
        lastname ? user.lastname = lastname : null;
        await user.save();

        res.json({ message: "Profile updated." });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "An error occurred while updating profile in server."});
    }
});

router.post("/addTeamMember", async (req,res) => {
    const { userId, teamMemberUsername } = req.body;

    try {
        const user = await User.findById(userId);
        const memberToBeAdded = await User.findOne({username: teamMemberUsername}); 
        if (!user) throw new Error("User not found");
        if (!memberToBeAdded) throw new Error("No user exists with this username.");

        if (user.team.includes(memberToBeAdded._id)) throw new Error("Already in team.");

        user.team.push(memberToBeAdded._id);
        memberToBeAdded.team.push(user._id);
        await user.save();
        await memberToBeAdded.save();

        res.json({message: "Team member added."});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message ? error.message : "An error occurred while adding team member."});
    }
});

export default router;