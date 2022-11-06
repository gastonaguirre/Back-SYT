const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Users = require('./users')
const Posts = require('./posts')
const Categories = require('./categories')
const userInactivo =require('./userInactivo')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/users', Users)
router.use('/posts', Posts)
router.use('/categories', Categories)
router.use('/userInactivo',userInactivo)


module.exports = router;