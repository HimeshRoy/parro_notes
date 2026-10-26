import prisma from "../lib/prisma.js";

export async function createTopic(
  name: string,
  slug: string,
  subjectId: string,
  description?: string,
) {
  return prisma.topic.create({
    data: {
      name,
      slug,
      description: description ?? null,
      subjectId,
    },
  });
}

export async function getTopics(subjectId?: string) {
  if (subjectId) {
    return prisma.topic.findMany({
      where: {
        subjectId,
      },
      orderBy: {
        name: "asc",
      },
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
    });
  }

  return prisma.topic.findMany({
    orderBy: {
      name: "asc",
    },
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
  });
}

export async function getTopicById(id: string) {
  return prisma.topic.findUnique({
    where: {
      id,
    },
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
  });
}

export async function getTopicBySlug(
  educationLevelSlug: string,
  programSlug: string,
  subjectSlug: string,
  topicSlug: string,
) {
  return prisma.topic.findFirst({
    where: {
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
  });
}

export async function updateTopic(
  id: string,
  name: string,
  slug: string,
  subjectId: string,
  description?: string,
) {
  return prisma.topic.update({
    where: {
      id,
    },
    data: {
      name,
      slug,
      description: description ?? null,
      subjectId,
    },
  });
}

export async function deleteTopic(id: string) {
  return prisma.topic.delete({
    where: {
      id,
    },
  });
}

export async function subjectExists(id: string) {
  const subject = await prisma.subject.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  return subject !== null;
}
