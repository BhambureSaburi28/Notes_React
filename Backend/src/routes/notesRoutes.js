import express from "express"
import {createNote, deleteNote, getAllNotes, getNoteById, updateNote} from "../controller/notesController.js"

const router = express.Router();

router.get("/", getAllNotes)
router.get("/:id", getNoteById)
router.post("/", createNote)
router.put("/:id", updateNote)
router.delete("/:id", deleteNote)

//http://localhost:5001/api/notes/21(id) : id will be anything , without id we cant to delete or update a post.

export default router

// app.get("/api/notes", (req, res)=>{
//     res.status(200).send(" you got 20 notes");
// })

// app.post("/api/notes", (req,res)=>{
//     res.status(201).json({message:"Post created successfully!"})
// })

// app.post("/api/notes/:id", (req,res)=>{
//     res.status(200).json({message:"Post updated successfully!"})
// })

// http://localhost:5001/api/notes/21(id) : id will be anything , without id we cant to delete or update a post.

// app.post("/api/notes/:id", (req,res)=>{
//     res.status(200).json({message:"Post Deleted successfully!"})
// })
