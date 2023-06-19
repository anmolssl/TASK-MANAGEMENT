import express from "express";

import Task from "../models/task.js";
import User from "../models/user.js";

const router = express.Router();

router.get("/dashboard", async (req,res) => {
    try {
        const userId = req.user._id;
        const populatedUser = await User.findById(userId).populate('team');

        res.json(populatedUser);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error.");
    }
});

router.post("/createTask", async (req,res) => {
    const {userId, title, description, date, priority} = req.body;

    try {
        const newTask = new Task({createdBy: userId, assignedTo: null, title, description, date, priority});
        await newTask.save();

        res.json({ message: "Task created successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "An error occurred while creating the task."});
    }
});

router.post("/deleteTask", async (req,res) => {
    const {taskId} = req.body;

    try {
        await Task.deleteOne({ _id: taskId });

        res.json({ message: "Task deleted successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "An error occurred while deleting the task."});
    }
});

router.get("/tasklist", async (req,res) => {
    const userId = req.query.ID;

    try {    
        const tasklist = await Task.find({createdBy: userId});
        res.json({message: "Found tasklist", tasklist: tasklist});   
    } catch (error) {
        console.log(error);
    }
});

export default router;