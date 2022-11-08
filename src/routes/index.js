const { Router } = require('express');
const {Admin} = require("../db")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Users = require('./users')
const Posts = require('./posts')
const Categories = require('./categories')
const userInactivo = require('./userinactivo')

const Premium = require('./premium')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/users', Users)
router.use('/posts', Posts)
router.use('/categories', Categories)
router.use('/userInactivo',userInactivo )

router.use('/premium', Premium)



module.exports = router;