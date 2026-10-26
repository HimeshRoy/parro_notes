import "dotenv/config";
import jwt from "jsonwebtoken";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return secret;
}

const JWT_SECRET: string = getJwtSecret();

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "7d";

export interface AdminJwtPayload {
  adminId: string;
}

export function signAdminToken(adminId: string): string {
  return jwt.sign(
    {
      adminId,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN as any,
    },
  );
}

export function verifyAdminToken(token: string): AdminJwtPayload {
  const decoded: unknown = jwt.verify(token, JWT_SECRET);

  if (typeof decoded !== "object" || decoded === null) {
    throw new Error("Invalid admin token");
  }

  const payload = decoded as Record<string, unknown>;

  if (typeof payload.adminId !== "string") {
    throw new Error("Invalid admin token");
  }

  return {
    adminId: payload.adminId,
  };
}
