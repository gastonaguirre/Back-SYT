const  axios  = require("axios");
const { Categories } = require("../db.js");

// let DbTypes = await Types.findAll().catch(e => undefined)
//   if(!DbTypes.length){
//     const types = await axios.get("https://pokeapi.co/api/v2/type").catch(e=>{
//     return {message:'No logro acceder a la API'}});
//     const typesData= types.data.results.map(e => e.name);
//     for(let i = 0; i < typesData.length; i++){
//       await Types.create({ name: typesData[i] })
const getAllCategories = async (req, res) => {
    try {
     const allc = await Categories.findAll(
      {
        attributes: ["name"]
      })
      if (!allc.length){
      const arr1 =  ["HTML","JAVASCRIPT","CSS","REACT","REDUX","NODE.JS", "EXPRESS", "SQLITE", "POSTGRESQL", "SEQUELIZE", "PRINCIPIANTE", "AVANZADO", "EXPERTO"]
      for(let i = 0; i < arr1.length; i++){
        await Categories.create({ name: arr1[i]})
      }
      allc = await Categories.findAll({
        attributes: ["name"]
      });                 
      return res.json(allc);
      }
     if (allc) res.json(allc);
    }catch(err) {
      res.status(500).send({ msg: "Error en el servidor: ", err: err.message });
      }
    }

const createCategorie = async (req, res) => {
  try{
    const {name} = req.body;
    const nameM = name.toUpperCase()
    const categorie = await Categories.findOrCreate({
        where: {name: nameM},
        defaults: {},
      });
    if(!categorie) throw new Error("No se pudo crear la categoria");

    res.status(200).send({
        msg: "Categoria Creada Exitosamente",
        post: categorie,
      });
  }catch(e){
    res.status(500).send({ msg: "Erorr en el servidor: ", e: e.message });
  }
}

const deleteCategorie = async (req, res) => {
  try {
    let { id } = req.params;
    let buscarid = await Categories.findByPk(id);
    if (buscarid) {
      await Categories.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).json({ msg: "Se elimino la categoria" });
    } else {
      res.status(400).json({ msg: "Id necesario para completar la accion" });
    }
  } catch (error) {
    res.status(500).send({ msg: "Erorr en el servidor: ", e: e.message });
  }
};

const editCategorie = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const findCategories = await Categories.findByPk(id);

    if (findCategories) {
      const CategoriesEdited = await Categories.update(
        {
          name
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
        "No se ha encontrado una categoria existente con el id ingresado."
      );
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("hubo un error");
  }
};

    
module.exports = { createCategorie, getAllCategories, deleteCategorie, editCategorie }