import bcrypt from "bcryptjs";

import {
  createAdmin,
  findAdminByEmail,
  findAdminById,
  findAdminByIdWithPassword,
  updateAdminLastLogin,
  updateAdminPassword,
  updateAdminProfile,
} from "./admin.service.js";

import { signAdminToken } from "../utils/jwt.js";

const SALT_ROUNDS = 12;

export async function registerAdmin(
  name: string,
  email: string,
  password: string,
) {
  const existingAdmin = await findAdminByEmail(email);

  if (existingAdmin) {
    throw new Error("ADMIN_ALREADY_EXISTS");
  }

  const passwordHash = await bcrypt.hash(
    password,
    SALT_ROUNDS,
  );

  const admin = await createAdmin(
    name,
    email,
    passwordHash,
  );

  return admin;
}

export async function loginAdmin(
  email: string,
  password: string,
) {
  const admin = await findAdminByEmail(email);

  if (!admin) {
    throw new Error("INVALID_CREDENTIALS");
  }

  if (!admin.isActive) {
    throw new Error("ADMIN_INACTIVE");
  }

  const passwordMatches = await bcrypt.compare(
    password,
    admin.passwordHash,
  );

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

export async function updateAdminProfileService(
  adminId: string,
  name: string,
  email: string,
) {
  const existingAdmin = await findAdminByEmail(email);

  if (
    existingAdmin &&
    existingAdmin.id !== adminId
  ) {
    throw new Error("EMAIL_ALREADY_IN_USE");
  }

  return updateAdminProfile(
    adminId,
    name,
    email,
  );
}

export async function changeAdminPasswordService(
  adminId: string,
  currentPassword: string,
  newPassword: string,
) {
  const admin =
    await findAdminByIdWithPassword(adminId);

  if (!admin) {
    throw new Error("ADMIN_NOT_FOUND");
  }

  const passwordMatches = await bcrypt.compare(
    currentPassword,
    admin.passwordHash,
  );

  if (!passwordMatches) {
    throw new Error("CURRENT_PASSWORD_INCORRECT");
  }

  if (currentPassword === newPassword) {
    throw new Error("PASSWORD_SAME_AS_CURRENT");
  }

  const passwordHash = await bcrypt.hash(
    newPassword,
    SALT_ROUNDS,
  );

  return updateAdminPassword(
    adminId,
    passwordHash,
  );
}
