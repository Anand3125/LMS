import { uploadMedia } from "../utils/cloudinary.js";

export const uploadVideoController = async (req, res) => {
  try {
    const result = await uploadMedia(req.file.path);
    res.status(200).json({
      success: true,
      message: "Video uploaded successfully.",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error uploading video" });
  }
};

export const uploadPdfController = async (req, res) => {
  try {
    const result = await uploadMedia(req.file.path);
    res.status(200).json({
      success: true,
      message: "PDF uploaded successfully.",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error uploading PDF" });
  }
};
