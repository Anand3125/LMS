import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = [
    "application/pdf",
    "video/mp4",
    "video/webm",
    "video/quicktime", // mov
    "video/x-matroska", // mkv
  ];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and video files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });
export default upload;

// import multer from "multer";

// const upload = multer({dest:"uploads/"});
// export default upload