const { Router } = require("express");
const {
  getUsers,
  // deleteIdUser,
  postUser,
  perfilUser,
  editUser,
  inicioSesion,
  deleteLogico,
  deleteIdUser,
  findOrCreate,
  perfilUser,
  editUser,
} = require("../controllers/users");

const router = Router();

router.get("/", getUsers);
router.get("/:idUser", perfilUser);
// router.delete("/:idDelete", deleteIdUser);
router.delete("/:id", deleteLogico)
router.post("/", postUser);
router.delete("/:idDelete", deleteIdUser);
router.post("/", findOrCreate);
router.patch("/:id", editUser);

module.exports = router;
