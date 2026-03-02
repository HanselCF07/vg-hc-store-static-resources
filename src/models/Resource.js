const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  resource_id: { type: String, required: true },
  product_type: { type: String, enum: ["video_game", "dlc"], required: true },
  product_id: { type: String, required: true },
  resource_location: String, //{ type: String, enum: ["head", "background", "catalog", "carousel"] },
  resources: [
    {
      file_id: String,
      title: String,
      url: String,
      status: { type: Number, default: 1 },
      uploaded_at: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model("Resource", resourceSchema);
