import prisma from "../lib/prisma.js";

export async function createEducationLevel(
  name: string,
  slug: string,
  description?: string,
) {
  return prisma.educationLevel.create({
    data: {
      name,
      slug,
      description: description ?? null,
    },
  });
}

export async function getEducationLevels() {
  return prisma.educationLevel.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function getEducationLevelById(id: string) {
  return prisma.educationLevel.findUnique({
    where: {
      id,
    },
  });
}

export async function getEducationLevelBySlug(
  slug: string,
) {
  return prisma.educationLevel.findUnique({
    where: {
      slug,
    },
  });
}

export async function updateEducationLevel(
  id: string,
  name: string,
  slug: string,
  description?: string,
) {
  return prisma.educationLevel.update({
    where: {
      id,
    },
    data: {
      name,
      slug,
      description: description ?? null,
    },
  });
}

export async function deleteEducationLevel(id: string) {
  return prisma.educationLevel.delete({
    where: {
      id,
    },
  });
}