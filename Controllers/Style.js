const Style = require("../Models/Style");

module.exports.getAllStyle = (req, res) => {
  Style.find()
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(404).json({ message: "Style not find", error: err.message })
    );
};

module.exports.getIdStyle = (req, res) => {
  const id = req.params.id;
  Style.findById(id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Style not found" });
      }
      res.json(data);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error fetching style", error: err.message });
    });
};

module.exports.postCreateStyle = (req, res) => {
  const url = "/backend";
  const {
    update_stop,
    stylist_comment,
    style_name,
    styling_arrangement_point,
    sync_date_start,
    sync_date_end,
    sync_start_time,
    sync_end_time,
    front,
    front1,
    front2,
    stylist_name,
    sex,
    length,
    color,
    style_image,
    style_menu_perm,
    style_menu_straight_perm,
    extensions,
    coupon,
    hair_amount_few,
    hair_amount_usually,
    hair_amount_many,
    hair_type_soft,
    hair_type_usually,
    hair_type_hard,
    thickness_thin,
    thickness_usually,
    thickness_thick,
    habit_none,
    habit_bit,
    habit_strong,
    face_type_round_shape,
    face_type_inverted_triangle,
    face_type_egg_shapped,
    face_type_base,
    face_type_square,
    menu_content,
    blog_identify_id,
  } = req.body;
  console.log("req.body: ", req.body);
  if (!req.files || !req.files["selectedImage1"]) {
    return res.status(400).json({ error: "Missing selectedImage1" });
  }

  const selectedImage1 = req.files["selectedImage1"][0].filename;
  const selectedImage2 =
    req.files && req.files["selectedImage2"]
      ? url + "/images/" + req.files["selectedImage2"][0].filename
      : null;

  const selectedImage3 =
    req.files && req.files["selectedImage3"]
      ? url + "/images/" + req.files["selectedImage3"][0].filename
      : null;
  console.log("selectImage1 : ", selectedImage1);
  console.log("selectImage2 : ", selectedImage2);
  console.log("selectImage3 : ", selectedImage3);
  const newStyleData = {
    update_stop,
    stylist_comment,
    style_name,
    styling_arrangement_point,
    sync_date_start,
    sync_date_end,
    selectedImage1: url + "/images/" + selectedImage1,
    selectedImage2,
    selectedImage3,
    sync_start_time,
    sync_end_time,
    front,
    front1,
    front2,
    stylist_name,
    sex,
    length,
    color,
    style_image,
    style_menu_perm,
    style_menu_straight_perm,
    extensions,
    coupon,
    hair_amount_few,
    hair_amount_usually,
    hair_amount_many,
    hair_type_soft,
    hair_type_usually,
    hair_type_hard,
    thickness_thin,
    thickness_usually,
    thickness_thick,
    habit_none,
    habit_bit,
    habit_strong,
    face_type_round_shape,
    face_type_inverted_triangle,
    face_type_egg_shapped,
    face_type_base,
    face_type_square,
    menu_content,
    blog_identify_id,
  };
  Style.create(newStyleData)
    .then((data) => res.json({ message: "Style added successfully", data }))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Failed to add style", error: err.message })
    );
};

module.exports.putUpdateStyle = (req, res) => {
  const url = "/backend";
  const {
    update_stop,
    stylist_comment,
    style_name,
    styling_arrangement_point,
    sync_date_start,
    sync_date_end,
    front,
    front1,
    front2,
    selectedImage1,
    selectedImage2,
    selectedImage3,
    sync_start_time,
    sync_end_time,
    stylist_name,
    sex,
    length,
    color,
    style_image,
    style_menu_perm,
    style_menu_straight_perm,
    extensions,
    coupon,
    hair_amount_few,
    hair_amount_usually,
    hair_amount_many,
    hair_type_soft,
    hair_type_usually,
    hair_type_hard,
    thickness_thin,
    thickness_usually,
    thickness_thick,
    habit_none,
    habit_bit,
    habit_strong,
    face_type_round_shape,
    face_type_inverted_triangle,
    face_type_egg_shapped,
    face_type_base,
    face_type_square,
    menu_content,
    blog_identify_id,
  } = req.body;

  let selectedImageUpload1 = "";
  let selectedImageUpload2 = "";
  let selectedImageUpload3 = "";

  if (req.files) {
    if (req.files["selectedImage1"]) {
      selectedImageUpload1 =
        url + "/images/" + req.files["selectedImage1"][0].filename;
    }

    if (req.files["selectedImage2"]) {
      selectedImageUpload2 =
        url + "/images/" + req.files["selectedImage2"][0].filename;
    }

    if (req.files["selectedImage3"]) {
      selectedImageUpload3 =
        url + "/images/" + req.files["selectedImage3"][0].filename;
    }
  }
  console.log("selectImageUpload1 : ", selectedImageUpload1);
  console.log("selectImageUpload2 : ", selectedImageUpload2);
  console.log("selectImageUpload3 : ", selectedImageUpload3);
  const newStyleData = {
    update_stop,
    stylist_comment,
    style_name,
    styling_arrangement_point,
    sync_date_start,
    sync_date_end,
    sync_start_time,
    sync_end_time,
    selectedImage1: selectedImageUpload1
      ? selectedImageUpload1
      : selectedImage1,
    selectedImage2: selectedImageUpload2
      ? selectedImageUpload2
      : selectedImage2,
    selectedImage3: selectedImageUpload3
      ? selectedImageUpload3
      : selectedImage3,
    front,
    front1,
    front2,
    stylist_name,
    sex,
    length,
    color,
    style_image,
    style_menu_perm,
    style_menu_straight_perm,
    extensions,
    coupon,
    hair_amount_few,
    hair_amount_usually,
    hair_amount_many,
    hair_type_soft,
    hair_type_usually,
    hair_type_hard,
    thickness_thin,
    thickness_usually,
    thickness_thick,
    habit_none,
    habit_bit,
    habit_strong,
    face_type_round_shape,
    face_type_inverted_triangle,
    face_type_egg_shapped,
    face_type_base,
    face_type_square,
    menu_content,
    blog_identify_id,
  };
  Style.findByIdAndUpdate(req.params.id, newStyleData)
    .then((data) => res.json({ message: "updated successfully", data }))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Failed to update style", error: err.message })
    );
};

module.exports.deleteStyle = (req, res) => {
  Style.findByIdAndDelete(req.params.id, req.body)
    .then((data) => res.json({ message: "Style deleted successfully", data }))
    .catch((err) => {
      res.status(404).json({ message: "book not found", error: err.message });
    });
};

// .sort({ createdAt: -1 })
