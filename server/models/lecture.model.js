import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
  lectureTitle: {
    type: String,
    required: true,
  },
  videoUrl: { type: String },
  publicId: { type: String },
  isPreviewFree: { type: Boolean },
  youtubeUrl: {
    type: String,
    required: false,  // make optional to maintain backward compatibility
  },
  
  pdfUrl:{ type: String }
  },{timestamps:true});

export const Lecture = mongoose.model("Lecture", lectureSchema);
