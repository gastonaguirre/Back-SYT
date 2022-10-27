const { Users } = require("../db");

const getUsers = async (req, res) => {
  try {
    const data = await Users.findAll();
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ msg: "NO hay nada en la base de datos" });
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

//controlador para el detalle del usuario
const perfilUser = async (req, res) => {
  try {
    const { idUser } = req.params;

    const buscar = await Users.findByPk(idUser);
    console.log(buscar);
    if (buscar) {
      res.status(200).send(buscar);
    } else {
      res.status(404).send("usuario no encontrado");
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

const postUser = async (req, res) => {
  try {
    let { name, apellido, descripcion } = req.body;
    let createUser = await Users.create({
      name,
      apellido,
      descripcion
    });

    res.status(200).send({
      msg:"Usuario Creado Exitosamente", 
      user:createUser
    });
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
};

const deleteIdUser = async (req, res) => {
  try {
    const { idDelete } = req.params;
    const buscar = await Users.findByPk(idDelete);
    if (buscar) {
      await Users.destroy({
        where: {
          id: idDelete,
        },
      });
      res.status(200).send("Eliminado Correctamente");
    } else {
      res.status(404).send("no existe ese id o ya fue eliminado");
    }
  } catch (error) {
    res.status(404).send(error + " no se pudo borrar el usuario");
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, apellido, descripcion } = req.body;
    const findUser = await Users.findByPk(id);
    
    if (findUser) {

      const fields = {}
      if(name) fields.name = name;
      if(apellido) fields.apellido = apellido;
      if(descripcion) fields.descripcion = descripcion;

      const userEdited = await Users.update(fields,{where:{id:id}});

      res.status(200).json("Cambios guardados");
    } else {
      throw new Error(
        "No se ha encontrado un usuario existente con el id ingresado."
      );
    }
  } catch (err) {
    res.status(400).send(`${err.message}`);
  }
};

module.exports = { getUsers, deleteIdUser, postUser, perfilUser, editUser };
