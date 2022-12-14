const { Router } = require('express');
const Users = require('./users')
const Posts = require('./posts')
const Categories = require('./categories')
const userInactivo = require('./userInactivo')
const Emails = require("./email")

const Premium = require('./premium')
const router = Router();

router.use('/users', Users)
router.use('/posts', Posts)
router.use('/categories', Categories)

router.use('/premium', Premium)

router.use('/userInactivo',userInactivo )
router.use("/send",Emails)

module.exports = router;