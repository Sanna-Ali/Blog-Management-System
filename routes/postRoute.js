const {
  verifyTokenAndOnlyUser,
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../MiddleWare/verifyToken");
const {
  createPostCtrl,
  updatePostCtrl,
  deletePostCtrl,
  publishPostCtrl,
  getPostCtrl,
  searchForPost,
  getPostAdminCtrl,
} = require("../controllers/postController");

const router = require("express").Router();
router.post("/add/", verifyToken, createPostCtrl);
router.get("/get", verifyTokenAndAdmin, getPostAdminCtrl);
router.put("/update/:id", verifyTokenAndAuthorization, updatePostCtrl);
router.delete("/delete/:id", verifyTokenAndAuthorization, deletePostCtrl);
router.put("/publish/:id", verifyTokenAndAuthorization, publishPostCtrl);
router.get("/", verifyToken, getPostCtrl);
router.get("/search", verifyToken, searchForPost);

module.exports = router;
