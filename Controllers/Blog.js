const Blog = require("../Models/Blog");

module.exports.getAllBlog = (req, res) => {
  Blog.find()
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(404).json({ message: "Blog not find", error: err.message })
    );
};

module.exports.getIdBlog = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.json(data);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error fetching Blog", error: err.message });
    });
};

module.exports.postCreateBlog = (req, res) => {
  const url = "/backend";
  const {
    update_stop,
    post_date,
    contributor,
    category,
    title_character,
    sync_date_start,
    sync_date_end,
    sync_start_time,
    sync_end_time,
    coupon,
    post_text,
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
  const newBlogData = {
    update_stop,
    post_date,
    contributor,
    category,
    title_character,
    coupon,
    // signature,
    selectedImage1: url + "/images/" + selectedImage1,
    selectedImage2,
    selectedImage3,
    post_text,
    sync_date_start,
    sync_date_end,
    sync_start_time,
    sync_end_time,
    blog_identify_id,
  };
  Blog.create(newBlogData)
    .then((data) => res.json({ message: "Blog added successfully", data }))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Failed to add Blog", error: err.message })
    );
};

module.exports.putUpdateBlog = (req, res) => {
  const url = "/backend";
  const {
    update_stop,
    post_date,
    contributor,
    category,
    title_character,
    coupon,
    // signature,
    selectedImage1,
    selectedImage2,
    selectedImage3,
    sync_date_start,
    sync_date_end,
    sync_start_time,
    sync_end_time,
    post_text,
    blog_identify_id,
  } = req.body;
  console.log("req.body: ", req.body)
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
  const newBlogData = {
    update_stop,
    post_date,
    contributor,
    sync_date_start,
    sync_date_end,
    sync_start_time,
    sync_end_time,
    category,
    title_character,
    coupon,
    // signature,
    selectedImage1: selectedImageUpload1
      ? selectedImageUpload1
      : selectedImage1,
    selectedImage2: selectedImageUpload2
      ? selectedImageUpload2
      : selectedImage2,
    selectedImage3: selectedImageUpload3
      ? selectedImageUpload3
      : selectedImage3,
    post_text,
    blog_identify_id,
  };
  Blog.findByIdAndUpdate(req.params.id, newBlogData)
    .then((data) => res.json({ message: "updated successfully", data }))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Failed to update Blog", error: err.message })
    );
};

module.exports.deleteBlog = (req, res) => {
  Blog.findByIdAndDelete(req.params.id, req.body)
    .then((data) => res.json({ message: "Blog deleted successfully", data }))
    .catch((err) => {
      res.status(404).json({ message: "book not found", error: err.message });
    });
};

// .sort({ createdAt: -1 })
