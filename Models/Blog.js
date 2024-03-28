const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  update_stop: {
    type: Boolean,
    // required: true,
  },
  post_date: {
    type: String,
  },
  sync_date_start: {
    type: String,
  },
  sync_date_end: {
    type: String,
  },
  sync_start_time: {
    type: String,
  },
  sync_end_time: {
    type: String,
  },
  contributor: {
    type: String,
  },
  category: {
    type: String,
  },
  title_character: {
    type: String,
  },
  coupon: {
    type: String,
  },
  // signature: {
  //   type: String,
  // },
  selectedImage1: {
    type: String,
    // required: true,
  },
  selectedImage2: {
    type: String,
    // required: true,
  },
  selectedImage3: {
    type: String,
    // required: true,
  },
  post_text: {
    type: String,
  },
  blog_identify_id: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
