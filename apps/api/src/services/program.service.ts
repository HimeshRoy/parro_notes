import prisma from "../lib/prisma.js";

export async function createProgram(
  name: string,
  slug: string,
  educationLevelId: string,
  description?: string,
) {
  return prisma.program.create({
    data: {
      name,
      slug,
      description: description ?? null,
      educationLevelId,
    },
  });
}

export async function getPrograms(educationLevelId?: string) {
  if (educationLevelId) {
    return prisma.program.findMany({
      where: {
        educationLevelId,
      },
      orderBy: {
        name: "asc",
      },
      include: {
        educationLevel: true,
      },
    });
  }

  return prisma.program.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      educationLevel: true,
    },
  });
}

export async function getProgramById(id: string) {
  return prisma.program.findUnique({
    where: {
      id,
    },
    include: {
      educationLevel: true,
    },
  });
}

export async function getProgramBySlug(
  educationLevelSlug: string,
  programSlug: string,
) {
  return prisma.program.findFirst({
    where: {
      slug: programSlug,
      educationLevel: {
        slug: educationLevelSlug,
      },
    },
    include: {
      educationLevel: true,
    },
  });
}

export async function updateProgram(
  id: string,
  name: string,
  slug: string,
  educationLevelId: string,
  description?: string,
) {
  return prisma.program.update({
    where: {
      id,
    },
    data: {
      name,
      slug,
      description: description ?? null,
      educationLevelId,
    },
  });
}

export async function deleteProgram(id: string) {
  return prisma.program.delete({
    where: {
      id,
    },
  });
}

export async function educationLevelExists(id: string) {
  const educationLevel = await prisma.educationLevel.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  return educationLevel !== null;
}
