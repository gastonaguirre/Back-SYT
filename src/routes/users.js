const { Router } = require("express");
const {
  getUsers,
  // deleteIdUser,

  perfilUser,
  editUser,
  inicioSesion,
  deleteLogico,
  deleteIdUser,
  findOrCreate,
} = require("../controllers/users");

const router = Router();

router.get("/", getUsers);
router.get("/:idUser", perfilUser);
// router.delete("/:idDelete", deleteIdUser);
router.delete("/:id", deleteLogico)
router.post("/", findOrCreate);
router.delete("/:idDelete", deleteIdUser);

router.patch("/:id", editUser);

module.exports = router;
