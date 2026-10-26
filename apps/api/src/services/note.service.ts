import prisma from "../lib/prisma.js";

export async function createNote(
  title: string,
  slug: string,
  topicId: string,
  description?: string,
) {
  return prisma.note.create({
    data: {
      title,
      slug,
      description: description ?? null,
      topicId,
    },
  });
}

export async function getNotes(topicId?: string) {
  if (topicId) {
    return prisma.note.findMany({
      where: {
        topicId,
      },
      orderBy: {
        title: "asc",
      },
      include: {
        topic: {
          include: {
            subject: {
              include: {
                program: {
                  include: {
                    educationLevel: true,
                  },
                },
              },
            },
          },
        },
        resources: true,
      },
    });
  }

  return prisma.note.findMany({
    orderBy: {
      title: "asc",
    },
    include: {
      topic: {
        include: {
          subject: {
            include: {
              program: {
                include: {
                  educationLevel: true,
                },
              },
            },
          },
        },
      },
      resources: true,
    },
  });
}

export async function getNoteById(id: string) {
  return prisma.note.findUnique({
    where: {
      id,
    },
    include: {
      topic: {
        include: {
          subject: {
            include: {
              program: {
                include: {
                  educationLevel: true,
                },
              },
            },
          },
        },
      },
      resources: true,
    },
  });
}

export async function getNoteBySlug(
  educationLevelSlug: string,
  programSlug: string,
  subjectSlug: string,
  topicSlug: string,
  noteSlug: string,
) {
  return prisma.note.findFirst({
    where: {
      slug: noteSlug,
      topic: {
        slug: topicSlug,
        subject: {
          slug: subjectSlug,
          program: {
            slug: programSlug,
            educationLevel: {
              slug: educationLevelSlug,
            },
          },
        },
      },
    },
    include: {
      topic: {
        include: {
          subject: {
            include: {
              program: {
                include: {
                  educationLevel: true,
                },
              },
            },
          },
        },
      },
      resources: true,
    },
  });
}

export async function updateNote(
  id: string,
  title: string,
  slug: string,
  topicId: string,
  description?: string,
) {
  return prisma.note.update({
    where: {
      id,
    },
    data: {
      title,
      slug,
      description: description ?? null,
      topicId,
    },
  });
}

export async function deleteNote(id: string) {
  return prisma.note.delete({
    where: {
      id,
    },
  });
}

export async function topicExists(id: string) {
  const topic = await prisma.topic.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  return topic !== null;
}