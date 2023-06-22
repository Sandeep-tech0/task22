const mysql = require("mysql");
let con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"task12"
})

con.connect((err)=>{
    if(err){
        console.log(err.sqlMessage)
    }else{
        console.log("database connected")
    }
})

module.exports = {con};