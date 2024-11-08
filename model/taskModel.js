import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    dueDate:{
        type: String,
        required: true
    },
    status:{
        type: String,       //complete, incomplete
        default: "incomplete"
    }
});

export default mongoose.model("tasks", taskSchema);
