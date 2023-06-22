const { con } = require('../model/dbConnect')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { createToken, } = require('../middleware/token')

const signup = async (req, res) => {
    try {
        // console.log(req.body)
        let { email, password, mobile_no, full_name, father_name } = req.body;
        if (!email || !password || !mobile_no) {
            res.send({ status: 400, "response": 'required parameter missing' })
        }

        let data = { email, password: await bcrypt.hash(password, 8), mobile_no, full_name, father_name }
        const sqlqurey = "INSERT INTO user1 SET ?";
        await con.query(sqlqurey, data, async (err, result) => {
            if (err) {
                return res.send(err.sqlMessage)
            }
            let token = await createToken(result.insertId)
            // console.log({ result, token })
           return res.send({ status: 200, "response": token })
        })
    } catch (error) {
        res.send(error.sqlMessage)
    }
}

const login = async (req, res) => {
    try {
        console.log(req.body)
        let { email, password } = req.body;
        if (!email || !password) {
           return res.send({ status: 400, "response": 'required parameter missing' })
        }
        const sqlqurey = `select * from user1 where email ='${email}' ; `;
        await con.query(sqlqurey,  async (err, result) => {
            if(err){
                return res.send({ status: 400, "response": err.sqlMessage })

            }
            // console.log('------------------------------')
            // console.log(result)
            // console.log('------------------------------')
            if (result.length > 0) {
                let {id,password} = result[0]
                let passwordCheck = await bcrypt.compare(req.body.password, password)
                console.log(passwordCheck)
                if (passwordCheck) {

                    let token = await createToken(id)
                    // console.log({ result, token })
                    return res.send({ status: 200, "response": { result, token } })
                } else {
                    return res.send({ status: 400, "response": 'incorrect password' })

                }
            } else {

                return res.send({ status: 400, "response": 'user not found'})
            }

        })
    } catch (error) {
        res.send(error.sqlMessage)
    }
}

const getInformation = async (req, res) => {
    try {

        res.send({ status: 200, "response": req.user })
    } catch (error) {
        res.send(error.sqlMessage)
    }
}


module.exports = { signup, login, getInformation }