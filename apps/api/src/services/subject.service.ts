import prisma from "../lib/prisma.js";

export async function createSubject(
  name: string,
  slug: string,
  programId: string,
  code?: string,
  description?: string,
) {
  return prisma.subject.create({
    data: {
      name,
      slug,
      code: code ?? null,
      description: description ?? null,
      programId,
    },
  });
}

export async function getSubjects() {
  return prisma.subject.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      program: {
        include: {
          educationLevel: true,
        },
      },
    },
  });
}

export async function getSubjectById(id: string) {
  return prisma.subject.findUnique({
    where: {
      id,
    },
    include: {
      program: {
        include: {
          educationLevel: true,
        },
      },
    },
  });
}

export async function getSubjectBySlug(
  educationLevelSlug: string,
  programSlug: string,
  subjectSlug: string,
) {
  return prisma.subject.findFirst({
    where: {
      slug: subjectSlug,
      program: {
        slug: programSlug,
        educationLevel: {
          slug: educationLevelSlug,
        },
      },
    },
    include: {
      program: {
        include: {
          educationLevel: true,
        },
      },
    },
  });
}

export async function updateSubject(
  id: string,
  name: string,
  slug: string,
  programId: string,
  code?: string,
  description?: string,
) {
  return prisma.subject.update({
    where: {
      id,
    },
    data: {
      name,
      slug,
      code: code ?? null,
      description: description ?? null,
      programId,
    },
  });
}

export async function deleteSubject(id: string) {
  return prisma.subject.delete({
    where: {
      id,
    },
  });
}

export async function programExists(id: string) {
  const program = await prisma.program.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  return program !== null;
}
