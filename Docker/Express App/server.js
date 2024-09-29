import express from "express";
import colors from "colors";
import dotenv from "dotenv";


// init 
const app = express();

// routing
app.get("/", (req, res) =>{
    res.status(200).json([
        {
            id : 1,
            name : "Amin Islam",
            age : 23

        }, 
        {
            id : 2,
            name : "Karim Islam",
            age : 230

        },
    ])
})


// listen
app.listen(5050,() =>{
    console.log('Server is running on port 5050'.bgBlue.white);
})