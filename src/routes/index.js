const { Router } = require('express');
const {Admin, User} = require("../db")
const { Op } = require("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Users = require('./users')
const Posts = require('./posts')
const Categories = require('./categories')
const Premium = require('./premium')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/users', Users)
router.use('/posts', Posts)
router.use('/categories', Categories)
router.use('/premium', Premium)


router.post("/admin", async(req, res) => {
    let {usuario, email} = req.body;
  try{
    let nuevoAdmin = await Admin.create({usuario, email})
    res.status(200).send({msg:"se creo el adming", admin: nuevoAdmin})
   } catch (err) {
     console.log(err);
     res.status(404).send("admin no creado")
    }
  });










module.exports = router;