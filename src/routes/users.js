const { Router } = require("express");
const {
  getUsers,
  perfilUser,
  editUser,
  deleteLogico,
  findOrCreate,
 
  
} = require("../controllers/users");

const router = Router();

router.get("/", getUsers);
router.get("/:idUser", perfilUser);
router.delete("/:id", deleteLogico)//nuevo pa 
router.post("/", findOrCreate);
router.patch("/:id", editUser);

module.exports = router;
