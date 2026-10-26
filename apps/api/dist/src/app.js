import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes.js";
import educationLevelRoutes from "./routes/educationLevel.routes.js";
import programRoutes from "./routes/program.routes.js";
import subjectRoutes from "./routes/subject.routes.js";
import topicRoutes from "./routes/topic.routes.js";
import noteRoutes from "./routes/note.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import noteResourceRoutes from "./routes/noteResource.routes.js";
import authRoutes from "./routes/auth.routes.js";
import noteRequestRoutes from "./routes/noteRequest.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { notFoundHandler } from "./middleware/notFound.middleware.js";
import searchRoutes from "./routes/search.routes.js";
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "Welcome to Parro Notes API 🦜",
    });
});
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/search", searchRoutes);
// app.get("/api/test-db", async (_req, res) => {
//   try {
//     await prisma.$queryRaw`SELECT 1`;
//     res.json({
//       success: true,
//       message: "Database connection successful 🦜",
//     });
//   } catch (error) {
//     console.error("Database connection failed:", error);
//     res.status(500).json({
//       success: false,
//       message: "Database connection failed",
//     });
//   }
// });
app.use("/api/education-levels", educationLevelRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/note-resources", noteResourceRoutes);
app.use("/api/note-requests", noteRequestRoutes);
app.use(notFoundHandler);
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map