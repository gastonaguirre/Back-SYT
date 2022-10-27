const { Users } = require("../db");

const getUsers = async (req, res) => {
  try {
    const data = await Users.findAll();
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ msg: "NO hay nada en la base de datos" });
    }
  } catch (err) {
    res.status(500).send({msg: "Erorr en el servidor: ", err: err.message});
  }
};

const perfilUser = async (req, res) => {
  try {
    const { idUser } = req.params;

    const buscar = await Users.findByPk(idUser);
    console.log(buscar);
    if (buscar) {
      res.status(200).send({user: buscar});
    } else {
      res.status(404).send({ msg: "usuario no encontrado" });
    }
  } catch (err) {
    res.status(500).send({msg: "Erorr en el servidor: ", err: err.message});
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
    res.status(500).send({msg: "Erorr en el servidor: ", err: err.message});
  }
};

const deleteIdUser = async (req, res) => {
  try {
    const { idDelete } = req.params;
    const buscar = await Users.findByPk(idDelete);
    if (buscar) {
      const userDestroyed = buscar
      await buscar.destroy();
      res.status(200).send({msg: "Eliminado Correctamente", user: userDestroyed });
    } else {
      res.status(404).send({msg: "no existe ese id o ya fue eliminado"});
    }
  } catch (err) {
    res.status(500).send({msg: "Erorr en el servidor: ", err: err.message});
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

      await findUser.update(fields);

      res.status(200).json({
        msg:"Cambios guardados",
        user: findUser
      });
    } else {
      res.status(404).send({
        msg: "No se ha encontrado un usuario existente con el id ingresado."
      });
    }
  } catch (err) {
    res.status(500).send({msg: "Erorr en el servidor: ", err: err.message});
  }
};

module.exports = { getUsers, deleteIdUser, postUser, perfilUser, editUser };
