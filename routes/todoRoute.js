const express = require("express")
const todoRoutes = express.Router();
const { viewTask, addTask, removeTask } = require("../controllers/todoController");
const { verifyToken, } = require('../middleware/token')




console.log("route")
todoRoutes.post("/add", verifyToken, addTask);
// todoRoutes.patch("/login",verifyToken, login);
todoRoutes.get("/view", verifyToken, viewTask);
todoRoutes.delete("/remove/:id", verifyToken, removeTask);

module.exports = { todoRoutes }