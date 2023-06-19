import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    createdBy: {
        type: String,
        required: true,
    },
    assignedTo : {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    }
});

const Task = mongoose.model("Task", taskSchema);

export default Task;