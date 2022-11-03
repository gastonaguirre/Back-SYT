const { Router } = require("express");
const {
  getUsers,
  deleteIdUser,
  postUser,
  perfilUser,
  editUser,
  inicioSesion,
  getUsersInactive,
  restoreUser,
} = require("../controllers/users");
// const { requiresAuth } = require('express-openid-connect');

const router = Router();

router.get("/", getUsers);
router.get("/login",inicioSesion);
router.get("/:idUser", perfilUser);
router.delete("/:idDelete", deleteIdUser);
router.post("/", postUser);
router.patch("/:id", editUser);
router.get("/banerUser",getUsersInactive);
router.put("/banerUser/:id",restoreUser)

module.exports = router;
