const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const passport = require("passport");
const passportJwt = require("../Middlewares/PassportJWT");
const requireAuth = passport.authenticate("jwt", { session: false });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter }).fields([
  { name: "selectedImage1", maxCount: 1 },
  { name: "selectedImage2", maxCount: 1 },
  { name: "selectedImage3", maxCount: 1 },
]);
const {
  getAllBlog,
  postCreateBlog,
  putUpdateBlog,
  deleteBlog,
  getIdBlog,
} = require("../Controllers/Blog");

router.get("/", requireAuth, getAllBlog);
router.get("/:id", getIdBlog);
router.post("/", upload, postCreateBlog);
router.put("/:id", upload, putUpdateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
