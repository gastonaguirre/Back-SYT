const {Router} = require ("express");
const {createComments} = require ("../controllers/comments")
const router = Router();

router.post("/", createComments)

module.exports = router;