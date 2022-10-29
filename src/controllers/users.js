const { Users, Posts } = require("../db");

const getUsers = async (req, res) => {
  try {
    const data = await Users.findAll();
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ msg: "NO hay nada en la base de datos" });
    }
  } catch (err) {
    res.status(500).send({ msg: "Erorr en el servidor: ", err: err.message });
  }
};

const inicioSesion = async (req, res) => {
  try {
    const { input, contraseña } = req.body;
    if (input) {
      const expReg =
        /^[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

      const objeto = {};
      if (expReg.test(input)) {
        objeto.email = input;
      } else {
        objeto.usuario = input;
      }
      console.log(objeto);
      const buscarInput = await Users.findOne({ where: objeto });

      if (buscarInput) {
        if (contraseña === buscarInput.contraseña) {
          res.status(200).send({ user: buscarInput });
        } else {
          res.status(400).json({ msg: "contraseña incorrectas" });
        }
      } else {
        res.status(404).send({ msg: "usuario o email no encontrado" });
      }
    } else {
      return res.status(404).send("necesito mas informacion");
    }
  } catch (err) {
    res.status(500).send({ msg: "Erorr en el servidor: ", err: err.message });
  }
};

const perfilUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    const buscar = await Users.findOne({
      include: {
        model: Posts,
        attributes: ["titulo", "texto", "media"],
      },
      where: {
        id: idUser,
      },
    });
    if (buscar) {
      res.status(200).send({ user: buscar });
    } else {
      res.status(404).send({ msg: "usuario no encontrado" });
    }
  } catch (err) {
    res.status(500).send({ msg: "Erorr en el servidor: ", err: err.message });
  }
};

const postUser = async (req, res) => {
  try {
    let { usuario, email, contraseña,foto_principal,foto_portada } = req.body;
    const expReg =
    /^[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    if(!expReg.test(email)){
      res.status(404).send("email invalido")
    }
    let createUser = await Users.create({
      usuario,
      email,
      contraseña,
      foto_principal:foto_principal || "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255588-stock-illustration-empty-photo-of-male-profile.jpg" ,
      foto_portada:foto_portada || "https://pits-agroforestal.net/wp-content/themes/merlin/images/default-slider-image.png"
    });

    res.status(200).send({
      msg: "Usuario Creado Exitosamente",
      user: createUser,
    });
  } catch (err) {
    res.status(500).send({ msg: "Erorr en el servidor: ", err: err.message });
  }
};

const deleteIdUser = async (req, res) => {
  try {
    const { idDelete } = req.params;
    const buscar = await Users.findByPk(idDelete);
    if (buscar) {
      const userDestroyed = buscar;
      await buscar.destroy();
      res
        .status(200)
        .send({ msg: "Eliminado Correctamente", user: userDestroyed });
    } else {
      res.status(404).send({ msg: "no existe ese id o ya fue eliminado" });
    }
  } catch (err) {
    res.status(500).send({ msg: "Erorr en el servidor: ", err: err.message });
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      apellido,
      foto_principal,
      foto_portada,
      descripcion,
      socials_links,
    } = req.body;
    const findUser = await Users.findByPk(id);

    if (findUser) {
      const fields = {};
      if (nombre) fields.nombre = nombre;
      if (apellido) fields.apellido = apellido;
      if (foto_principal) fields.foto_principal = foto_principal;
      if (foto_portada) fields.foto_portada = foto_portada;
      if (descripcion) fields.descripcion = descripcion;
      if (socials_links) fields.socials_links = socials_links;

      if (fields !== {}) {
        await findUser.update(fields);
        res.status(200).json({
          msg: "Cambios guardados",
          user: findUser,
        });
      } else res.status(400).send({ msg: "No se ingresaron cambios" });
    } else {
      res.status(404).send({
        msg: "No se ha encontrado un usuario existente con el id ingresado.",
      });
    }
  } catch (err) {
    res.status(500).send({ msg: "Erorr en el servidor: ", err: err.message });
  }
};

module.exports = {
  getUsers,
  deleteIdUser,
  postUser,
  perfilUser,
  editUser,
  inicioSesion,
};
