const { Router } = require('express');
const { getAllPost } = require('../controllers/posts');


const router = Router();

router.get('/', getAllPost);

module.exports = router;