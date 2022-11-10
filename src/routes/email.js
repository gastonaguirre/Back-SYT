const {enviarEmailsPost}= require("../controllers/mailer");

const { Router } = require('express');
const router = Router();


router.post("/emails",enviarEmailsPost)


module.exports = router;