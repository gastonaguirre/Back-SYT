const { Router } = require("express");
const {
  getUsers,
  perfilUser,
  editUser,
  deleteLogico,
  findOrCreate,
  userPremiun,
} = require("../controllers/users");

const router = Router();

router.get("/", getUsers);
router.get("/:idUser", perfilUser);
router.delete("/:id", deleteLogico)
router.post("/", findOrCreate);
router.patch("/:id", editUser);
router.put("/premium/:id",userPremiun)
module.exports = router;
