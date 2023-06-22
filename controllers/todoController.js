const { con } = require('../model/dbConnect')


const addTask = async (req, res) => {
    try {
        let { title } = req.body;
        if (!title ) {
            res.send({ status: 400, "response": 'required parameter missing' })
        }

        let data = {title,user_id:req.user.id}
        const sqlqurey = "INSERT INTO todolist SET ?";
        await con.query(sqlqurey,data , async (err, result) => {
            if (err) {
                return res.send(err.sqlMessage)
            }
            res.send({ status: 200, "response": 'item added' })
        })
    } catch (error) {
        res.send(error.sqlMessage)
    }
}

// const editTask = async (req, res) => {
//     try {
//         let { title } = req.body;
//         if (!title ) {
//             res.send({ status: 400, "response": 'required parameter missing' })
//         }

//         const sqlqurey = `update todolist set ?  where user_id = ? `;
//         await con.query(sqlqurey, {title} async (err, result) => {
//             // console.log('------------------------------')
//             // console.log(result)
//             // console.log('------------------------------')
//             if (result) {
//                 let passwordCheck = await bcrypt.compare(password, result[0].password)
//                 if (passwordCheck) {
//                     let {id} = result[0]
//                     let token = await createToken(id)
//                     // console.log({ result, token })
//                     return res.send({ status: 200, "response": { result, token } })
//                 } else {
//                     return res.send({ status: 400, "response": 'incorrect password' })

//                 }
//             } else {

//                 return res.send({ status: 400, "response": 'user not found' ,sks:err.sqlMessage})
//             }

//             // if(err){
//             //     return res.send(err.sqlMessage)
//             // }
//             // res.send({status:200, "response":result})
//         })
//     } catch (error) {
//         res.send(error.sqlMessage)
//     }
// }

const viewTask = async (req, res) => {
    try {
        await con.query('select * from todolist where user_id = ? order by id desc',req.user.id , async (err, result) => {
            if (err) {
                return res.send(err.sqlMessage)
            }
            res.send({ status: 200, "response": result })
        })
    } catch (error) {
        res.send(error.sqlMessage)
    }
}

const removeTask = async (req, res) => {
    try {
        const {id} = req.params
        await con.query('delete from todolist where id  = ?', id , async (err, result) => {
            if (err) {
                return res.send(err.sqlMessage)
            }
            res.send({ status: 200, "response": result })
        })
    } catch (error) {
        res.send(error.sqlMessage)
    }
}


module.exports = { viewTask, addTask, removeTask }