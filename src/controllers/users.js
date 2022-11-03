const { Users, Posts, Categories } = require("../db");
const { post } = require("../routes");

const getUsers = async (req, res) => {
  try {
    const data = await Users.findAll();
    if (!data.length) throw new Error ("No hay usuarios en la base de datos")

   
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send({ msg: "Erorr en el servidor: ", err: err.message });
  }
};

const inicioSesion = async (req, res) => {
  try {
    const { input, contraseña } = req.body;
    if (!input) throw new Error ("No se ingreso un usuario o email")
    if (!contraseña) throw new Error ("No se ingreso una contraseña")
    const expReg = /^[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    const field = {};
    if (expReg.test(input)) field.email = input;
    else field.usuario = input;

    const buscarInput = await Users.findOne({ where: field });
    if (!buscarInput) throw new Error ("usuario o email no encontrado")
    if (contraseña !== buscarInput.contraseña) throw new Error ("contraseña incorrecta")
    res.status(200).send({ user: buscarInput });

    res.status(200).json(createUser)
  } catch (err) {
    res.status(500).send({ msg: "Erorr en el servidor: ", err: err.message });
  }
};

const perfilUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    let buscar = await Users.findOne({
      include: {
        model: Posts,
        attributes: ["titulo", "texto", "media"],
        include:{
          model: Categories,
          attributes: ["name"],
          through: {attributes : []}
        }
      },
      where: {
        id: idUser,
      },
    });
    if (!buscar) throw new Error ("usuario no encontrado")
    res.status(200).send({ user: buscar });
   
  } catch (err) {
    res.status(500).send({ msg: "Error en el servidor: ", err: err.message });
  }
};

const postUser = async (req, res) => {
  try {
    let { usuario, email, foto_principal, foto_portada } = req.body;    
    const [user, created] = await Users.findOrCreate({
      where:{ 
        email,
      },
      defaults:{
      usuario,
      foto_principal:foto_principal || "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255588-stock-illustration-empty-photo-of-male-profile.jpg",
      foto_portada:foto_portada || "https://pits-agroforestal.net/wp-content/themes/merlin/images/default-slider-image.png",
      },  
    })
    if(!created)  return res.status(200).send({ msg: "So vo amigo", user: user })
    res.status(200).send({
      msg: "Usuario Creado Exitosamente",
      user: user,
    })
  } catch (err) {
    res.status(500).send({ msg: "Erorr en el servidor: ", err: err.message });
  }
};

const deleteIdUser = async (req, res) => {
  try {
    const { idDelete } = req.params;
    const buscar = await Users.findByPk(idDelete);
    if (!buscar) throw new Error ("no existe ese id o ya fue eliminado")
    const userDestroyed = buscar;
    await buscar.destroy();
    res.status(200).send({
      msg: "Eliminado Correctamente", 
      user: userDestroyed 
    });    
  } catch (err) {
    res.status(500).send({ msg: "Error en el servidor: ", err: err.message });
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
    if (!findUser) throw new Error("No se ha encontrado un usuario existente con el id ingresado");

    const fields = {};
    if (nombre) fields.nombre = nombre;
    if (apellido) fields.apellido = apellido;
    if (foto_principal) fields.foto_principal = foto_principal;
    if (foto_portada) fields.foto_portada = foto_portada;
    if (descripcion) fields.descripcion = descripcion;
    if (socials_links) fields.socials_links = socials_links;

    if (fields === {}) throw new Error("No se recibieron parametros para cambiar");
    
    await findUser.update(fields);
    res.status(200).json({
      msg: "Cambios guardados",
      user: findUser,
    });
  } catch (err) {
    res.status(500).send({ msg: "Error en el servidor: ", err: err.message });
  }
};


async function getUsersInactive(){
  const usersInactive = Users.findAll({
      where:{
        deletedAt:{
          [Op.ne]:null
        },
    },
    paranoid: false
  })
  //console.log("controller", usersInactive)
  return usersInactive
}


module.exports = {
  getUsers,
  deleteIdUser,
  postUser,
  perfilUser,
  editUser,
  inicioSesion,
  getUsersInactive,
};
