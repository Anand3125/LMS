import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
import cron from "node-cron";
import axios from "axios";
import { clientUrl } from "utils/baseurl";
dotenv.config();

// 📡 Connect to MongoDB
connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

// 🔧 Middlewares
app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));
app.use(cors({
  origin: clientUrl,
  credentials: true
}));

// 🧩 Routes
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);

// ⏰ Cron Job - Fetch user profile every 14 minutes
cron.schedule("*/14 * * * *", async () => {
  try {
    const response = await axios.get("https://lms-zq1s.onrender.com/api/v1/user/profile");
    console.log("⏰ Cron Job Executed: /api/v1/user/profile ✅ Status:", response.status);
  } catch (error) {
    console.error("⚠️ Cron Job Error while calling /profile:", error.message);
  }
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT} 🌐`);
});
