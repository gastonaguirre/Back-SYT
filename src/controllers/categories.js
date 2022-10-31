const { Categories } = require("../db.js");

const getAllCategories = async (req, res) => {
  try {
    let allc = await Categories.findAll({attributes: [ "name" ]})
    if (!allc.length){
      const arr1 =  [
        "HTML", "JAVASCRIPT", "CSS", "REACT", "REDUX",
        "NODE.JS", "EXPRESS", "SQLITE", "POSTGRESQL", 
        "SEQUELIZE", "PRINCIPIANTE", "AVANZADO", "EXPERTO"
      ]
      for(let i = 0; i < arr1.length; i++){
        await Categories.create({ name: arr1[i] })
      }
      allc = await Categories.findAll({
        attributes: ["name"]
      });                 
      return res.status(200).json(allc);
    }
    else res.status(200).json(allc);
  }catch(err) {
    res.status(500).send({ msg: "Error en el servidor: ", err: err.message });
  }
}

const createCategorie = async (req, res) => {
  try{
    const {name} = req.body;
    const nameM = name.toUpperCase()
    const [categorie, created] = await Categories.findOrCreate({
      where: { name: nameM },
      defaults: {},
    });
    if(!categorie) throw new Error("No se pudo crear la categoria");
    const createdMsg = created ? "Categoria creada exitosamente" : "Categoria ya existente"
    res.status(200).send({
      msg: createdMsg,
      Categorie: categorie,
    });
  }catch(err){
    res.status(500).send({ msg: "Erorr en el servidor: ", err: err.message });
  }
}

const deleteCategorie = async (req, res) => {
  try {
    let { id } = req.params; 
    let nameUpperCase = id.toUpperCase()
    let buscarName = await Categories.findByPk(nameUpperCase); 
    if (!buscarName) throw new Error("No se encontro la categoria");
    
    await buscarName.destroy();
    res.status(200).json({ msg: "Se elimino la categoria" });
    
  } catch (error) {
    res.status(500).send({ msg: "Error en el servidor: ", error: error.message });
  }
};

const editCategorie = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const idUpperCase = id.toUpperCase()
    const findCategories = await Categories.findByPk(idUpperCase);
    if (findCategories) {
      const CategoriesEdited = await Categories.update(
        {
          name
        },	
        {	
          where: {	
            name: idUpperCase,	
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
