const { Router } = require("express");
const {
  getUsers,
  deleteIdUser,
  postUser,
  perfilUser,
  editUser,
  inicioSesion
} = require("../controllers/users");
// const { requiresAuth } = require('express-openid-connect');

const router = Router();

router.get("/", getUsers);
router.get("/:idUser", perfilUser);
router.delete("/:idDelete", deleteIdUser);
router.post("/", postUser);
router.patch("/:id", editUser);

module.exports = router;
