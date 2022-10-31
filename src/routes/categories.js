const { Router } = require("express");
const { createCategorie, getAllCategories, deleteCategorie, editCategorie } = require("../controllers/categories");

const router = Router();

router.get("/", getAllCategories)
router.post("/", createCategorie);
router.delete("/:id", deleteCategorie);
router.patch("/:id", editCategorie);

module.exports = router;