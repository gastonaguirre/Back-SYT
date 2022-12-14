const { Posts, Users, Categories } = require("../db");
const { uploadsArchivos, deleteArchivo } = require("../cloudinary/cloudinary");
const fs = require("fs-extra");
const { Op } = require("sequelize");

// router.get("/countries",async(req,res)=>{
//   const name = req.query.name
  
//   try{
//      if(name){
//          let nombresiestan = await Country.findAll({ 
//            where: { name: { [Op.iLike]: `%${name}%` } }
//          })
//          nombresiestan.length ? res.status(200).json(nombresiestan) : res.status(404).send('No se encontro el Pais');
  

const getAllPost = async (req, res) => {

    const titulo = req.query.titulo
    try {
       if(titulo){
        let tituloFind = await Posts.findAll({
          where: {titulo: { [Op.iLike]: `%${titulo}%`}},
          include: [
            {
              model: Users,
              attributes: ["usuario", "foto_principal"],
            },
            {
              model: Categories,
              attributes: ["name"],
              through: { attributes: [] },
            },
          ],
        })
        if(!titulo.length){
          res.status(404).send('No se encontro el titulo');
        }else{
          
          res.status(200).json(tituloFind)
        }
       }else{
    let data = await Posts.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Users,
          attributes: ["usuario", "foto_principal"],
        },
        {
          model: Categories,
          attributes: ["name"],
          through: { attributes: [] },
        },

      ],
    });
    if (!data.length) throw new Error("No hay posts en la base de datos");

    res.status(200).json(data);

  }} catch (err) {
    res.status(500).send({ msg: "Erorr en el servidor: ", err: err.message });
  }
};

const createPost = async (req, res) => {
  try {

    const { titulo, texto, categories, userId, premium } = req.body;
    const arrayCate = JSON.parse(categories);

    if (!userId) throw new Error(" missing param id");
    const user = await Users.findByPk(userId, {
      attributes: ["usuario", "foto_principal"],
    });
    if (!user) throw new Error("No se encuentra el usuario");


    const cate = await Categories.findAll({
      where: {
        name: arrayCate,
      },
    });

    const fields = {};
    if (titulo) fields.titulo = titulo;
    if (texto) fields.texto = texto;
    if (premium) fields.premium = premium;
    fields.likes = []
    if (req.files) {
      const ar = await uploadsArchivos(req.files.file.tempFilePath);
      let paraeliminar = ar.public_id;
      let url = ar.url;
      fields.url = paraeliminar;
      fields.media = url;
      await fs.unlink(req.files.file.tempFilePath);
    }
    fields.userId = userId;
    const newPost = await Posts.create(fields);
    if (!newPost) throw new Error("No se pudo crear el post");

    user.addPosts(newPost);
    newPost.addCategories(cate);

    res.status(200).send({
      msg: "Post Creado Exitosamente",
      post: { ...newPost.dataValues, user: user },
    });
  } catch (err) {
    res.status(500).send({ msg: "Error en el servidor: ", err: err.message });
  }
};

const detailPost = async (req, res) => {
  try {
    let { id } = req.params;
    let buscarid = await Posts.findByPk(id);
    if (!buscarid) throw new Error("No se encontro la publicacion");
    res.status(200).json(buscarid);
  } catch (err) {
    res.status(500).send({ msg: "Error en el servidor: ", err: err.message });
  }
};

const eliminarPost = async (req, res) => {
  try {
    let { id } = req.params;
    let buscarid = await Posts.findByPk(id);
    if (!buscarid) {
      res.status(500).json({ msg: "No se encontro ese posts" });
    }
    if (buscarid.media) {
      await deleteArchivo(buscarid.url);
    }

    await buscarid.destroy();

    res.status(200).json({ msg: "Se elimino el posteo",posts:buscarid }); 
  } catch (err) {
    res.status(500).send({ msg: "Error en el servidor: ", err: err.message });
  }
};

const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, texto, media, likes } = req.body;
    const findPost = await Posts.findByPk(id);
    if (!findPost) throw new Error("No se encontro la publicacion");
    const fields = {};
    if (likes) fields.likes = [...likes];
    if (titulo) fields.titulo = titulo;
    if (texto) fields.texto = texto;
    if (media) fields.media = media;
    if (fields === {})
      throw new Error("No se recibieron parametros para cambiar");

    await findPost.update(fields);
    console.log(findPost);
    res.status(200).json({
      msg: "Cambios guardados",
      post: findPost,
    });
    return findPost;
  } catch (err) {
    res.status(500).send({ msg: "Error en el servidor", error: err.message });
  }
};
const aumenLikePost =async (req, res)=>{
  try{
    const {id} =req.params;
    const findPost = await Posts.findByPk(id);
    if (!findPost) throw new Error("No se ha encontrado un post existente con el id ingresado");
    const fields = {};
    fields.likes = +1;
    await findPost.update(fields); 
    
    
    res.status(200).json({
      msg:"+1",
      post:findPost,
    });

  }catch(error){
    res.status(400).json({msg:error.msg}) 
  }
}

module.exports = { getAllPost, createPost, detailPost, eliminarPost, editPost ,aumenLikePost};
