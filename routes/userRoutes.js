const express = require("express")
const userRoutes = express.Router();
const { signup, login, getInformation } = require("../controllers/userController");
const { verifyToken, } = require('../middleware/token')




console.log("route")
userRoutes.post("/signup", signup);
userRoutes.post("/login", login);
userRoutes.get("/user", verifyToken,getInformation);

module.exports = { userRoutes }