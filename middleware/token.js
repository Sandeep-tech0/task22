const jwt = require('jsonwebtoken')
const { con } = require('../model/dbConnect')
const jwtSecret = 'qwsdfgbnm,asdfgbnmertyhujik'


const createToken = (value) =>{
    console.log(value)

    let token = jwt.sign({'user_id': value},jwtSecret,{expiresIn:'24h'})
    console.log({token})
   return token
}


const verifyToken = async (req,res,next) =>{

    let token = req.header('token')
    if(token){
       let userId = await jwt.verify(token,jwtSecret)
       if(userId ){
           await con.query(`select * from user1 where id = ${userId.user_id}`, (error,result)=>{
                if(result.length >0) {
                        let user = result[0]
                        req.user = user
                        next()
                }
            })
       }
    }
}


module.exports = { createToken, verifyToken}