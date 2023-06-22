const express = require("express")
const cors = require("cors")
const app = express();
const port= 5000
const {userRoutes} = require("./routes/userRoutes");
const { todoRoutes } = require("./routes/todoRoute");
const lodash = require('morgan')
app.use(express.json());
app.use(cors());
app.use(lodash(''))

app.use("/api",userRoutes);
app.use("/api",todoRoutes);



app.listen(port,(err)=>{
    console.log(`my server is running on port ${port}`)
})