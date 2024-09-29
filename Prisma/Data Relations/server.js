import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

// dotenv config
const app = express();
dotenv.config();

const prisma  = new PrismaClient();

// env var
const PORT = process.env.PORT || 6060;
 
//middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}));

// error handler

// routing
app.get("/user/", async (req, res) =>{
    const user = await prisma.user.findMany();

    res.status(200).json({user});
});

app.post("/user/", async (req, res) =>{

    const data = req.body

    const user = await prisma.user.create({data});

    res.status(200).json({user});
});
   
// student routing
app.get("/student/", async (req, res) =>{
    const student = await prisma.student.findMany({
        include : {
            books : true
        }
    });
    
    res.status(200).json({student});
});

app.post("/student/", async (req, res) =>{

    const data = req.body
 
    const student = await prisma.student.create({data});

    res.status(200).json({student});
}); 

// books routing
app.get("/book/", async (req, res) =>{
    const book = await prisma.book.findMany({
        include : {
            student : true
        }
    });

    res.status(200).json({book});
});

app.post("/book/", async (req, res) =>{
     
    const data = req.body
 
    const book = await prisma.book.create({data});

    res.status(200).json({book});
}); 

// controller
app.get("/cat/", async (req, res) =>{
    const cats  = await prisma.category.findMany();
    res.status(200).json({cats});
});


// listent server
app.listen(PORT, () =>{
    console.log(`Server is running on ${PORT}`.bgBlue.white);
});