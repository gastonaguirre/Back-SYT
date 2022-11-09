const { Router } = require("express");
const {
  getUsers,
  deleteIdUser,
  findOrCreate,
  perfilUser,
  editUser,
<<<<<<< HEAD
  inicioSesion,
  getUsersInactive,
  restoreUser,
=======
>>>>>>> c40a7f589618eeabf9d2f868427aa5e34459fe89
} = require("../controllers/users");

const router = Router();

router.get("/", getUsers);
router.get("/:idUser", perfilUser);
router.delete("/:idDelete", deleteIdUser);
router.post("/", findOrCreate);
router.patch("/:id", editUser);
router.get("/banerUser",getUsersInactive);
router.put("/banerUser/:id",restoreUser)

module.exports = router;
