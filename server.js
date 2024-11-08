import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import route from "./routes/taskRoute.js";

const app = express();
const dataBaseConnection= 'mongodb://localhost:27017';
app.use(express.json());


mongoose.connect(dataBaseConnection)
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

app.listen(8080, ()=> {
    console.log("Node API app is running on port 8080")
});

app.use("/task/crud", route);