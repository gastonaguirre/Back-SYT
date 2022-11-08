const { Router } = require("express");
const {
  getUsers,
  // deleteIdUser,
  findOrCreate,
  deleteLogico,
  deleteIdUser,
  perfilUser,
  editUser,
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
