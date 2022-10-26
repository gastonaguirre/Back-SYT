const {Posts} = require("../db");

//////// get de todos los post
const getAllPost =  async(req, res) => {

    try{
        const data = await Posts.findAll()
        console.log(data)
        if (data){
        res.status(200).json(data);
        }else{
            res.status(400).json({msg:"NO hay nada en la base de datos"})
        }
    }catch(error){
        console.log(error)
    }
}
///////////////////////////// post  para crear Post del model de la base de datos
const postOFPost = async(req, res )=>{
    try{
        const {titulo ,texto , media } = req.body
        
        if(titulo && texto && media){
            let titulonew = titulo.charAt(0).toUpperCase() + titulo.slice(1).toLowerCase();
            const [Postexite, create] = await Posts.findOrCreate({
                where: {
                    titulo: titulonew,
                },
                defaults: {
                    texto,
                    media,
                },
              });
              res.status(200).json(Postexite)
        }else{
            res.status(400).json({msg:"Me faltaron datos bro "})
        }
    }catch(error){
        throw new Error ("algo salio mal ")
    }
    
}
/////////////////////////////////////////////////

/////////////////////////////// ruta para ver un post por id basicamente el datalle de ese id q buscan 
const detailPost = async(req, res) =>{
    
    try{
        let {id} = req.params
        if(id){
            let buscarid = await Posts.findByPk(id)
            console.log(buscarid)
            res.status(200).json(buscarid)
        }else{
            res.status(400).json({msg: "Falta id pa"})
        }

    }catch(error){
        console.log(error)
    }
}

/////////////////////////// ruta para eliminar las Post 
const eliminarPost = async(req, res)=>{
    try{
        let {id} = req.params
        let buscarid = await Posts.findByPk(id)
        if(buscarid){
            await Posts.destroy({
                where:{
                    id: id
                }
            })
            res.status(200).json({msg:"Se elimino el posteo"})
        }else{  
            res.status(400).json({msg:"pasame un id capo"})
        }
    }catch(error){
        console.log(error)
    }
}

module.exports = { getAllPost , postOFPost, detailPost, eliminarPost}