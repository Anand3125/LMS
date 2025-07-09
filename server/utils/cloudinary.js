import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

/**
 * Uploads any media file to Cloudinary.
 * Supports PDFs, videos, and others by auto-detecting resource_type.
 */
export const uploadMedia = async (filePath) => {
  try {
    const ext = path.extname(filePath).toLowerCase();

    // Detect resource type
    let resourceType = "auto";
    if (ext === ".pdf") resourceType = "raw";
    else if ([".mp4", ".webm", ".mov", ".mkv"].includes(ext)) resourceType = "video";

    const uploadResponse = await cloudinary.uploader.upload(filePath, {
      resource_type: resourceType,
      folder: "lms_uploads",
    });

    // Delete local file
    fs.unlinkSync(filePath);

    return uploadResponse;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};

/**
 * Deletes any file from Cloudinary (image, pdf, etc.)
 */
export const deleteMediaFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "raw",
    });
  } catch (error) {
    console.error("Delete PDF/raw error:", error);
  }
};

/**
 * Specifically deletes a video from Cloudinary
 */
export const deleteVideoFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "video",
    });
  } catch (error) {
    console.error("Delete video error:", error);
  }
};



// import { v2 as cloudinary } from "cloudinary";
// import dotenv from "dotenv";
// dotenv.config({});

// cloudinary.config({
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
//   cloud_name: process.env.CLOUD_NAME,
// });

// export const uploadMedia = async (file) => {
//   try {
//     const uploadResponse = await cloudinary.uploader.upload(file, {
//       resource_type: "auto",
//     });
//     return uploadResponse;
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const deleteMediaFromCloudinary = async (publicId) => {
//   try {
//     await cloudinary.uploader.destroy(publicId);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const deleteVideoFromCloudinary = async (publicId) => {
//     try {
//         await cloudinary.uploader.destroy(publicId,{resource_type:"video"});
//     } catch (error) {
//         console.log(error);
        
//     }
// }