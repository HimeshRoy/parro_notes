import "dotenv/config";
import jwt from "jsonwebtoken";
function getJwtSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not configured");
    }
    return secret;
}
const JWT_SECRET = getJwtSecret();
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "7d";
export function signAdminToken(adminId) {
    return jwt.sign({
        adminId,
    }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
}
export function verifyAdminToken(token) {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded !== "object" || decoded === null) {
        throw new Error("Invalid admin token");
    }
    const payload = decoded;
    if (typeof payload.adminId !== "string") {
        throw new Error("Invalid admin token");
    }
    return {
        adminId: payload.adminId,
    };
}
//# sourceMappingURL=jwt.js.map