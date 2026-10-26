import bcrypt from "bcryptjs";
import { createAdmin, findAdminByEmail, findAdminById, updateAdminLastLogin, } from "./admin.service.js";
import { signAdminToken } from "../utils/jwt.js";
const SALT_ROUNDS = 12;
export async function registerAdmin(name, email, password) {
    const existingAdmin = await findAdminByEmail(email);
    if (existingAdmin) {
        throw new Error("ADMIN_ALREADY_EXISTS");
    }
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const admin = await createAdmin(name, email, passwordHash);
    return admin;
}
export async function loginAdmin(email, password) {
    const admin = await findAdminByEmail(email);
    if (!admin) {
        throw new Error("INVALID_CREDENTIALS");
    }
    if (!admin.isActive) {
        throw new Error("ADMIN_INACTIVE");
    }
    const passwordMatches = await bcrypt.compare(password, admin.passwordHash);
    if (!passwordMatches) {
        throw new Error("INVALID_CREDENTIALS");
    }
    await updateAdminLastLogin(admin.id);
    const token = signAdminToken(admin.id);
    const safeAdmin = await findAdminById(admin.id);
    return {
        token,
        admin: safeAdmin,
    };
}
//# sourceMappingURL=auth.service.js.map