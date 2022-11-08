const { Router } = require("express");
const {
  getUsers,
<<<<<<< HEAD
  deleteIdUser,
=======
  perfilUser,
  editUser,
  deleteLogico,
>>>>>>> 5964201 (ahhah)
  findOrCreate,
} = require("../controllers/users");

const router = Router();

router.get("/", getUsers);
router.get("/:idUser", perfilUser);
<<<<<<< HEAD
router.delete("/:idDelete", deleteIdUser);
=======
router.delete("/:id", deleteLogico)
>>>>>>> 5964201 (ahhah)
router.post("/", findOrCreate);
router.patch("/:id", editUser);

module.exports = router;
