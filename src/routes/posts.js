const { Router } = require("express");
const {
  getAllPost,
  createPost,
  detailPost,
  eliminarPost,
  editPost,
} = require("../controllers/posts");
const fileUpload = require("express-fileupload")
const router = Router();

router.get("/", getAllPost);
router.get("/:id", detailPost);
router.post("/",fileUpload({
  useTempFiles:true,
  tempFileDir:"./uploads"
}) ,createPost);
router.delete("/:id", eliminarPost);
router.patch("/:id", editPost);

module.exports = router;
