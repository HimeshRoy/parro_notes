import { loginAdmin, registerAdmin, } from "../services/auth.service.js";
import { findAdminById, } from "../services/admin.service.js";
export async function registerAdminController(req, res) {
    try {
        const { name, email, password } = req.body;
        if (typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string") {
            res.status(400).json({
                success: false,
                message: "Name, email and password are required",
            });
            return;
        }
        if (name.trim().length < 2) {
            res.status(400).json({
                success: false,
                message: "Name must be at least 2 characters",
            });
            return;
        }
        if (password.length < 8) {
            res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters",
            });
            return;
        }
        const admin = await registerAdmin(name.trim(), email.trim().toLowerCase(), password);
        res.status(201).json({
            success: true,
            message: "Admin created successfully",
            data: admin,
        });
    }
    catch (error) {
        if (error instanceof Error &&
            error.message === "ADMIN_ALREADY_EXISTS") {
            res.status(409).json({
                success: false,
                message: "An admin with this email already exists",
            });
            return;
        }
        console.error("Admin registration failed:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create admin",
        });
    }
}
export async function loginAdminController(req, res) {
    try {
        const { email, password } = req.body;
        if (typeof email !== "string" ||
            typeof password !== "string") {
            res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
            return;
        }
        const result = await loginAdmin(email.trim().toLowerCase(), password);
        res.json({
            success: true,
            message: "Login successful",
            data: result,
        });
    }
    catch (error) {
        if (error instanceof Error &&
            error.message === "INVALID_CREDENTIALS") {
            res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
            return;
        }
        if (error instanceof Error &&
            error.message === "ADMIN_INACTIVE") {
            res.status(403).json({
                success: false,
                message: "Admin account is inactive",
            });
            return;
        }
        console.error("Admin login failed:", error);
        res.status(500).json({
            success: false,
            message: "Failed to login",
        });
    }
}
export async function getCurrentAdminController(req, res) {
    try {
        if (!req.adminId) {
            res.status(401).json({
                success: false,
                message: "Authentication required",
            });
            return;
        }
        const admin = await findAdminById(req.adminId);
        if (!admin) {
            res.status(401).json({
                success: false,
                message: "Admin account not found",
            });
            return;
        }
        res.json({
            success: true,
            data: admin,
        });
    }
    catch (error) {
        console.error("Get current admin failed:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch current admin",
        });
    }
}
//# sourceMappingURL=auth.controller.js.map