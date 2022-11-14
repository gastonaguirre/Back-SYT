const { Posts, Users, Comments} = require("../db");

const getComments = async (req, res)=>{
    try {
        
    } catch (error) {
        res.status(500).send({msg: "Error en el servidor", error:error.msg})
        
    }
}
const createComments = async (req, res)=>{
    try {
        const {postId, texto}= req.body;
        const post = await Posts.findByPk(postId)
        if(!post){
            throw new Error ("El post no existe")
        }  
        console.log(post)

        const newComment = await Comments.create({
            texto:texto,
            postId:postId,
        });
        console.log(newComment)
        if (newComment){         
            res.status(200).json(newComment)
        }else {
            throw new Error("No se pudo crear el comentario");
        }   
    } catch (error) {
        res.status(500).send({msg: "Error en el servidor", error:error.msg})
    }
}




const deleteComments = async (req, res)=>{
    try {
        
    } catch (error) {
        res.status(500).send({msg: "Error en el servidor", error:error.msg})
    }
}
module.exports = { createComments};