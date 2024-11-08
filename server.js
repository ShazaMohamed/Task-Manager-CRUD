import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import route from "./routes/taskRoute.js";

const app = express();
app.use(express.json());

// //routes
// app.get('/',(req,res)=>{
//     res.send("HELLO NODE API")
// });
// app.get('/blog',(req,res)=>{
//     res.send('Hello bloggggggg')
// });


mongoose.connect('mongodb://localhost:27017')
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

app.listen(8080, ()=> {
    console.log("Node API app is running on port 8080")
});

app.use("/task/crud", route);