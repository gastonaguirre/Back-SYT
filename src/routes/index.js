const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Users = require('./users')
const Posts = require('./posts')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/users', Users)
router.use('/posts', Posts)


module.exports = router;