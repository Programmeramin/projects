import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client";

//config
const app = express();
dotenv.config();

const prisma = new PrismaClient();

// env var
const PORT = process.env.PORT || 6060;

// middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}));


// controller
app.get("/user/", async (req, res) =>{
    const user  = await prisma.user.findMany({
        include : {
            trans : true
        }
    });
    res.status(200).json({user});
});
   
// create student controller
app.post("/user/", async (req, res) =>{
    const data = req.body;
    const user = await prisma.user.create({data});
    res.status(200).json({user});
});


// Single view user
app.get("/user/:id", async (req, res) =>{
    const {id} = req.params;

    const user = await prisma.user.findMany({where : {id : Number(id)}});
    res.status(200).json({user});
})

// UPDATE  user
app.patch("/user/:id", async (req, res) =>{
    const {id} = req.params;
    const data = req.body;

    const user = await prisma.user.update({where : {id : Number(id)}, data : data});
    res.status(200).json({user});
})


// delete single user
app.delete("/user/:id", async (req, res) =>{
    const {id} = req.params;

    const user = await prisma.user.delete({where : {id : Number(id)}});
    res.status(200).json({user});
});
 

// controller
app.get("/student/", async (req, res) =>{
    const user  = await prisma.student.findMany({
        include : {
            books : true
        }
    });
    res.status(200).json({user});
});
        
 
 // trans controller
app.get("/trans/", async (req, res) =>{   
    const trans  = await prisma.trans.findMany({
        include : {
            user : true
        }
    });
    res.status(200).json({trans});
});    

 // trans controller
 app.post("/trans/", async (req, res) =>{
    const trans  = await prisma.trans.create({
        data : req.body
    }); 
    res.status(200).json({trans});
});


// create student controller
app.post("/student/", async (req, res) =>{
    const data = req.body;
    const user = await prisma.student.create({data});
    res.status(200).json({user});
});

 

 
// controller
app.get("/cat/", async (req, res) =>{
    const cats  = await prisma.category.findMany({
        include : {
            posts : true,
        }
    });
    res.status(200).json({cats});
});   


// controller
app.post("/cat/", async (req, res) =>{
    const cats  = await prisma.category.create({
       data : req.body
    });
    res.status(200).json({cats});
}); 

// create student controller
app.get("/post/", async (req, res) =>{ 
    const posts = await prisma.post.findMany({
        include : {
            categories : true
        }
    });
    res.status(200).json({posts});
});     

// create student controller
app.post("/post/", async (req, res) =>{ 
  
     const post = await prisma.post.create({        
       data : {
        title : req.body.title,
       }
    });
   
    await prisma.categoriesOnPost.create({
        data : {
            postId : post.id,
            categoryId : 1,
            assignedBy : "amin",
        }
    });


});   
              
// listen server
app.listen(PORT, () =>{
    console.log(`Server is running on ${PORT}`.bgGreen.white);
})    