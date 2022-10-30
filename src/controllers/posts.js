const { Posts, Users, Categories} = require("../db");

const getAllPost = async (req, res) => {
  try {
    let data = await Posts.findAll({
      include:[
        {
          model: Users,
          attributes: ["usuario","foto_principal"],
        },
        {
          model: Categories,
          attributes: ["name"],
          through: {attributes : []}
        },
      ]
    });
    if (!data.length) throw new Error ("No hay posts en la base de datos")
    
    // data= data.map(post=>{
    //   post = post.dataValues;
    //   post.categories = post.categories.map (e=>e.dataValues.name)
    //   return post
    // })

    res.status(200).json(data);   
  } catch (err) {
    res.status(500).send({ msg: "Erorr en el servidor: ", err: err.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { titulo, texto, categories, media, userId } = req.body;
    if (!userId) throw new Error(" missing param id");
    const user = await Users.findByPk(userId);
    if (!user) throw new Error("No se encuentra el usuario");
    const cate = await Categories.findAll({
      where: {
        name: categories,
      },
    });
    if (!cate.length) throw new Error ("No se encontraron las categorias")
    
    const newPost = await Posts.create({
      titulo,
      texto,
      media,
      userId,
      categories
    });

    if (!newPost) throw new Error("No se pudo crear el post");

    user.addPosts(newPost);
    newPost.addCategories(cate)
    //newPost.dataValues.categories = cate.map(e => e.dataValues.name)

    res.status(200).send({
      msg: "Post Creado Exitosamente",
      post: newPost,
    });
  } catch (err) {
    res.status(500).send({ msg: "Error en el servidor: ", err: err.message });
  }
};

const detailPost = async (req, res) => {
  try {
    let { id } = req.params;
    let buscarid = await Posts.findByPk(id);
    if (!buscarid) throw new Error ("No se encontro la publicacion")
    res.status(200).json(buscarid);
  } catch (err) {
    res.status(500).send({ msg: "Error en el servidor: ", err: err.message });
  }
};

const eliminarPost = async (req, res) => {
  try {
    let { id } = req.params;
    let buscarid = await Posts.findByPk(id);
    if(!buscarid) throw new Error ("No se encontro la publicacion o ya esta eliminada")
    await buscarid.destroy();
    res.status(200).json({ msg: "Se elimino el posteo" });
  } catch (err) {
    res.status(500).send({ msg: "Error en el servidor: ", err: err.message });
  }
};

const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, texto, media } = req.body;
    const findPost = await Posts.findByPk(id);
    if (!findPost) throw new Error("No se encontro la publicacion");
    const fields = {}
    if (titulo) fields.titulo = titulo;
    if (texto) fields.texto = texto;
    if (media) fields.media = media;
    if (fields === {}) throw new Error("No se recibieron parametros para cambiar");
    
    await findPost.update(fields);
    res.status(200).json({
      msg: "Cambios guardados",
      post: findPost,
    });
    
  } catch (err) {
    res.status(500).send({msg: "Error en el servidor", error: err.message});
  }
};

module.exports = { getAllPost, createPost, detailPost, eliminarPost, editPost };
