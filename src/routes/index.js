const { Router } = require('express');
const {Admin} = require("../db")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Users = require('./users')
const Posts = require('./posts')
const Categories = require('./categories')
const userInactivo =require('./userInactivo')
const Premium = require('./premium')
const Comments = require('./comments')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/users', Users)
router.use('/posts', Posts)
router.use('/categories', Categories)
router.use('/userInactivo',userInactivo)
router.use('/premium', Premium)
router.use ('/comments',Comments)



router.post("/admin", async(req, res) => {
    let {usuario, email, contraseña} = req.body;
  try{
    let nuevoAdmin = await Admin.create({usuario, email, contraseña})
    res.status(200).send("se creo el admin")
   } catch (err) {
     console.log(err);
     res.status(404).send("admin no creado")
    }
  });
module.exports = router;