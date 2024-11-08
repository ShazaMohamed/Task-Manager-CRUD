import Task from "../model/taskModel.js"

export const createTask = async (req, res) =>{
    try{
        const { title, description, dueDate, status }= req.body;

        if (await Task.findOne({title})){
            return res.status(400).json({message:"Task already exists ! "});
        }
        if(!title || !dueDate ){
            return res.status(400).json({message:"title,dueDate and status are required ! "});
        }
        const newTask= new Task({
            title, description, dueDate, status
        });
        await newTask.save();
        return res.status(201).json({ message: "Task created successfully", task: newTask });
    }
    catch (error){
        res.status(500).json({message : "error creating task",error: "Internal Server Error."});
    }
};
export const readTasks = async (req, res) =>{
    try{
        const tasks = await Task.find();
        if (Task.length == 0){
            return res.status(400).json({messsage: "No tasks available ! "})
        }
        res.status(200).json({message: "Tasks retrieved successfully", tasks})
    }
    catch (error){
        res.status(500).json({message : "error reading tasks",error: "Internal Server Error."});
    }
};
export const updateTask = async (req, res) =>{
    try{
        const id = req.params.id;
        
        if (! await Task.findOne({_id: id})){
            return res.status(404).json({message:"Task doesn't exist ! "})
        }
        const updated = await Task.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json({message: "Task updated successfully",updated})
    }
    catch (error){
        res.status(500).json({message : "error updating task",error: "Internal Server Error."});
    }
};
export const deleteTask = async (req, res) =>{
    try{
        const id = req.params.id;
        
        if (! await Task.findOne({_id: id})){
            return res.status(404).json({message:"Task doesn't exist ! "})
        }
        const updated = await Task.findByIdAndDelete(id);
        res.status(200).json({message: "Task is deleted successfully "})
    }
    catch (error){
        res.status(500).json({message : "error deleting task",error: "Internal Server Error."});
    }
};
export const markTask = async (req, res) =>{
    try{
        const id = req.params.id;
        const status = req.params.status;
        // console.log(status)
        if (status !== "complete" && status !== "incomplete"){
            return res.status(404).json({message:"Please only mark task as complete or incomplete"})
        }
        if (! await Task.findOne({_id: id})){
            return res.status(400).json({message:"Task doesn't exist ! "})
        }
        const updated = await Task.findByIdAndUpdate(id, { status }, {new: true});
        res.status(200).json({message: "Task marked successfully ",updated})
    }
    catch (error){
        res.status(500).json({message : "error marking task",error: "Internal Server Error."});
    }
};
export const filterByStatus = async (req, res) =>{
    try{
        const status = req.params.status;
        console.log(status)
        if (status !== "complete" && status !== "incomplete"){
            return res.status(404).json({message:"Please only mark task as complete or incomplete"});
        }
        const retrievedTasks = await Task.find({status});
        // console.log(retrievedTasks)
        res.status(200).json({message: "Tasks retrieved successfully",retrievedTasks});
    }
    catch (error){
        res.status(500).json({message : "error retrieving {status} tasks",error: "Internal Server Error."});
    }
};