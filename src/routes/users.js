const { Router } = require("express");
const {
  getUsers,
  deleteIdUser,
  postUser,
  perfilUser,
} = require("../controllers/users");

const router = Router();

router.get("/", getUsers);

router.get("/:idUser", perfilUser);

router.delete("/:idDelete", deleteIdUser);

router.post("/", postUser);

module.exports = router;
