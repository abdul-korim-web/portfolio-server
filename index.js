import express from "express"
import projectModal from './src/schemas/productSchema.js';
import { databaseConnecttion } from "./src/config/db.js";
import dotenv from "dotenv"
import cors from "cors"

const app = express()
app.use(express.json())
dotenv.config()
app.use(cors())




//  database connection 
databaseConnecttion()
// home response 
app.get(`/`,(req,res)=>{
    res.status(200).json({success:true,message:"server is running"})
})

//  get all product 

app.get(`/project`,async(req,res,next)=>{
try {
    
    const allProjects = await projectModal.find()
    if (!allProjects  || allProjects?.length===0) {
return        res.status(400).json({success:false,message:"product not found"})
    }
        res.status(200).json({success:true,message:"product found",totalProjects:allProjects?.length,allProjects})

} catch (error) {
    next(error)
}
})
// insert product 
app.post(`/project`,async(req,res,next)=>{
try {
    const projectData = req.body

    console.log('projectData', projectData)
    const createProduct = await projectModal.create(projectData)
     return res.status(201).json({
      success: true,
      message: "project added successfully",
      data: createProduct
    });
} catch (error) {
    next(error)
}
})

//  get single product 
app.get(`/project/:id`,async(req,res,next)=>{
    try {
        const {id} = req.params
        const project = await projectModal.findById(id)
        if (!project) {
            return res.status(404).json({success:false,message:"product not found"})
        }
        res.status(200).json({success:true,message:"product found",project})
    } catch (error) {
        next(error)
    }
})
// get top project 
app.get(`/topproject`,async(req,res,next)=>{
    try {
        const topProject = await projectModal.find({topProject: true})
        if (!topProject  || topProject?.length===0) {
            return res.status(404).json({success:false,message:"top product not found"})
        }
        res.status(200).json({success:true,message:"top product found",topProject})
    } catch (error) {
        next(error)
    }
})
// error handeling 
app.use((err,req,res,next)=>{
    console.log(err?.message || err);
    res.status(400).json({success:false,message:"This is a server site error.Please Contact with Developer "})
    next(err?.message || err)
})


const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})