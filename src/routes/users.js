const { Router } = require('express');
const { getUsers, createUser } = require('../controllers/users')

const router = Router();

router.get('/', getUsers)

module.exports = router;