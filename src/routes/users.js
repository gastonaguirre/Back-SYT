const { Router } = require("express");
const {
  getUsers,
  // deleteIdUser,
  editUser,
  deleteLogico,
  findOrCreate,
  perfilUser,
} = require("../controllers/users");

const router = Router();

router.get("/", getUsers);
router.get("/:idUser", perfilUser);

router.delete("/:id", deleteLogico)

router.post("/", findOrCreate);
router.patch("/:id", editUser);

module.exports = router;
