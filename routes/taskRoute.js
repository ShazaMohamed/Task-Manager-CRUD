import express from "express";
import { createTask, readTasks, updateTask, deleteTask, markTask, filterByStatus } from "../controller/taskController.js";



const route = express.Router();

route.post("/createTask", createTask);
route.get("/readTasks", readTasks);
route.put("/updateTask/:id", updateTask);
route.delete("/deleteTask/:id", deleteTask);
route.patch("/markTask/:id/:status", markTask);
route.get("/filterByStatus/:status", filterByStatus);
export default route;