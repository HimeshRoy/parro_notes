import prisma from "../lib/prisma.js";

export async function createAdmin(
  name: string,
  email: string,
  passwordHash: string,
) {
  return prisma.admin.create({
    data: {
      name,
      email,
      passwordHash,
    },
    select: {
      id: true,
      name: true,
      email: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      lastLoginAt: true,
    },
  });
}

export async function findAdminByEmail(email: string) {
  return prisma.admin.findUnique({
    where: {
      email,
    },
  });
}

export async function findAdminById(id: string) {
  return prisma.admin.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      lastLoginAt: true,
    },
  });
}

export async function updateAdminLastLogin(id: string) {
  return prisma.admin.update({
    where: {
      id,
    },
    data: {
      lastLoginAt: new Date(),
    },
  });
}

export async function updateAdminProfile(
  id: string,
  name: string,
  email: string,
) {
  return prisma.admin.update({
    where: {
      id,
    },
    data: {
      name,
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      lastLoginAt: true,
    },
  });
}

export async function updateAdminPassword(
  id: string,
  passwordHash: string,
) {
  return prisma.admin.update({
    where: {
      id,
    },
    data: {
      passwordHash,
    },
    select: {
      id: true,
      name: true,
      email: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      lastLoginAt: true,
    },
  });
}

export async function findAdminByIdWithPassword(
  id: string,
) {
  return prisma.admin.findUnique({
    where: {
      id,
    },
  });
}