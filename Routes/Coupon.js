const express = require("express");
const router = express.Router();
//passport
const passport = require("passport");
const passportJwt = require("../Middlewares/PassportJWT");
const requireAuth = passport.authenticate("jwt", { session: false });
// const multer = require("multer");
// const { v4: uuidv4 } = require("uuid");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./images");
//   },
//   filename: function (req, file, cb) {
//     cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
//   if (allowedFileTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({ storage, fileFilter });
const {
  getAllCoupon,
  postCreateCoupon,
  putUpdateCoupon,
  deleteCoupon,
  getIdCoupon,
} = require("../Controllers/Coupon");

router.get("/",requireAuth, getAllCoupon);
router.get("/:id", getIdCoupon);
router.post("/", postCreateCoupon);
router.put("/:id", putUpdateCoupon);
router.delete("/:id", deleteCoupon);

module.exports = router;
