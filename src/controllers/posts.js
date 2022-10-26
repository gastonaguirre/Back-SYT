const {Posts} = require("../db");

//////// get de todos los post
const getAllPost =  async(req, res) => {

    try{
        const data = await Posts.findAll()
        console.log(data)
        if (data === true){
        res.status(200).json(data);
        }else{
            res.status(400).json({msg:"NO hay nada en la base de datos"})
        }
    }catch(error){
        console.log(error)
    }
}


module.exports = { getAllPost }