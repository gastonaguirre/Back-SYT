const { Posts, Users } = require("../db");
const {uploadsArchivos, deleteArchivo} = require("../cloudinary/cloudinary")
const fs = require("fs-extra");
const getAllPost = async (req, res) => {
  try {
    const data = await Posts.findAll({
      include: {
        model: Users,
        attributes: ["name","apellido"],
      },
    });

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ msg: "NO hay nada en la base de datos" });
    }
  } catch (error) {
    console.log(error);
  }
};

const createPost = async (req, res) => {
  
  try {
    
    const { titulo, texto , userId } =await req.body;

    const {file} =  req.files
    
    if (!userId) throw new Error(" missing param id");
    const user = await Users.findByPk(userId);
    if (!user) throw new Error("No se encuentra el usuario");
    if(file){
      const ar = await uploadsArchivos(file.tempFilePath)
        let cosita =  ar.url
        let fotos= ar.secure_url
      const newPost = await Posts.create({
        titulo,
        texto,
        userId,
        media: cosita,
        foto: fotos
      });
      if (!newPost) throw new Error("No se pudo crear el post");
  
      user.addPosts(newPost);
      
      await fs.unlink(req.files.file.tempFilePath)
      res.status(200).send({
        msg: "Post Creado Exitosamente",
        post: newPost,
      });
    }
  } catch (err) {
    res.status(500).send({ msg: "Erorr en el servidor: ", err: err.message });
  }
};

const detailPost = async (req, res) => {
  try {
    let { id } = req.params;
    if (id) {
      let buscarid = await Posts.findByPk(id);

      res.status(200).json(buscarid);
    } else {
      res.status(400).json({ msg: "Falta id pa" });
    }
  } catch (error) {
    console.log(error);
  }
};

const eliminarPost = async (req, res) => {
  try {
    let { id } = req.params;
    let buscarid = await Posts.findByPk(id);
    if (buscarid.media.length > 15){
      await deleteArchivo(buscarid.media)
    }
    if (buscarid) {

      await Posts.destroy({
        where: {
          id: id,
        },
      });
      
      res.status(200).json({ msg: "Se elimino el posteo" });
    } else {
      res.status(400).json({ msg: "pasame un id capo" });
    }
  } catch (error) {
    console.log(error);
  }
};

const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, texto, media } = req.body;
    const findPost = await Posts.findByPk(id);

    if (findPost) {
      const postEdited = await Posts.update(
        {
          titulo,
          texto,
          media,
        },
        {
          where: {
            id: id,
          },
        }
      );
      res.status(200).json("Cambios guardados");
    } else {
      throw new Error(
        "No se ha encontrado un post existente con el id ingresado."
      );
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("hubo un error");
  }
};

module.exports = { getAllPost, createPost, detailPost, eliminarPost, editPost };
