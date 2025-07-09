import express from "express";
import upload from "../utils/multer.js";
import {
  uploadVideoController,
  uploadPdfController,
} from "../controllers/media.controller.js";

const router = express.Router();

router.post("/upload-video", upload.single("file"), uploadVideoController);
router.post("/upload-pdf", upload.single("file"), uploadPdfController);

export default router;



// import express from "express";
// import upload from "../utils/multer.js";
// import { uploadMedia } from "../utils/cloudinary.js";

// const router = express.Router();

// router.route("/upload-video").post(upload.single("file"), async(req,res) => {
//     try {
//         const result = await uploadMedia(req.file.path);
//         res.status(200).json({
//             success:true,
//             message:"File uploaded successfully.",
//             data:result
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message:"Error uploading file"})
//     }
// });

// router.route("/upload-pdf").post(upload.single("file"), async(req,res) => {
//     try {
//         const result = await uploadMedia(req.file.path); // This should work for PDFs too
//         res.status(200).json({
//             success:true,
//             message:"PDF uploaded successfully.",
//             data:result
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message:"Error uploading PDF"})
//     }
// });
// export default router;
