const { Router } = require('express');
const { getAllPost , postOFPost, detailPost, eliminarPost} = require('../controllers/posts');


const router = Router();

router.get('/', getAllPost);
router.get("/:id", detailPost)
router.post("/", postOFPost)
router.delete("/:id",eliminarPost)

module.exports = router;