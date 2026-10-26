import prisma from "../lib/prisma.js";

export type SearchResultType =
  | "note"
  | "topic"
  | "subject"
  | "program"
  | "education-level";

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  description: string | null;
  slug: string;
  code?: string | null;
  href: string;
  hierarchy: {
    educationLevel?: string;
    program?: string;
    subject?: string;
    topic?: string;
  };
}

export async function searchContent(
  query: string,
): Promise<SearchResult[]> {
  const term = query.trim();

  if (!term) {
    return [];
  }

  const [educationLevels, programs, subjects, topics, notes] =
    await Promise.all([
      prisma.educationLevel.findMany({
        where: {
          OR: [
            {
              name: {
                contains: term,
                mode: "insensitive",
              },
            },
            {
              slug: {
                contains: term,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: term,
                mode: "insensitive",
              },
            },
          ],
        },
        orderBy: {
          name: "asc",
        },
        take: 10,
      }),

      prisma.program.findMany({
        where: {
          OR: [
            {
              name: {
                contains: term,
                mode: "insensitive",
              },
            },
            {
              slug: {
                contains: term,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: term,
                mode: "insensitive",
              },
            },
          ],
        },
        include: {
          educationLevel: true,
        },
        orderBy: {
          name: "asc",
        },
        take: 10,
      }),

      prisma.subject.findMany({
        where: {
          OR: [
            {
              name: {
                contains: term,
                mode: "insensitive",
              },
            },
            {
              slug: {
                contains: term,
                mode: "insensitive",
              },
            },
            {
              code: {
                contains: term,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: term,
                mode: "insensitive",
              },
            },
          ],
        },
        include: {
          program: {
            include: {
              educationLevel: true,
            },
          },
        },
        orderBy: {
          name: "asc",
        },
        take: 10,
      }),

      prisma.topic.findMany({
        where: {
          OR: [
            {
              name: {
                contains: term,
                mode: "insensitive",
              },
            },
            {
              slug: {
                contains: term,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: term,
                mode: "insensitive",
              },
            },
          ],
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
        orderBy: {
          name: "asc",
        },
        take: 10,
      }),

      prisma.note.findMany({
        where: {
          OR: [
            {
              title: {
                contains: term,
                mode: "insensitive",
              },
            },
            {
              slug: {
                contains: term,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: term,
                mode: "insensitive",
              },
            },
          ],
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
        },
        orderBy: {
          title: "asc",
        },
        take: 20,
      }),
    ]);

  const results: SearchResult[] = [];

  for (const level of educationLevels) {
    results.push({
      id: level.id,
      type: "education-level",
      title: level.name,
      description: level.description,
      slug: level.slug,
      href: `/notes/${level.slug}`,
      hierarchy: {},
    });
  }

  for (const program of programs) {
    results.push({
      id: program.id,
      type: "program",
      title: program.name,
      description: program.description,
      slug: program.slug,
      href: `/notes/${program.educationLevel.slug}/${program.slug}`,
      hierarchy: {
        educationLevel: program.educationLevel.name,
      },
    });
  }

  for (const subject of subjects) {
    results.push({
      id: subject.id,
      type: "subject",
      title: subject.name,
      description: subject.description,
      slug: subject.slug,
      code: subject.code,
      href: `/notes/${subject.program.educationLevel.slug}/${subject.program.slug}/${subject.slug}`,
      hierarchy: {
        educationLevel:
          subject.program.educationLevel.name,
        program: subject.program.name,
      },
    });
  }

  for (const topic of topics) {
    results.push({
      id: topic.id,
      type: "topic",
      title: topic.name,
      description: topic.description,
      slug: topic.slug,
      href: `/notes/${topic.subject.program.educationLevel.slug}/${topic.subject.program.slug}/${topic.subject.slug}/${topic.slug}`,
      hierarchy: {
        educationLevel:
          topic.subject.program.educationLevel.name,
        program: topic.subject.program.name,
        subject: topic.subject.name,
      },
    });
  }

  for (const note of notes) {
    results.push({
      id: note.id,
      type: "note",
      title: note.title,
      description: note.description,
      slug: note.slug,
      href: `/notes/${note.topic.subject.program.educationLevel.slug}/${note.topic.subject.program.slug}/${note.topic.subject.slug}/${note.topic.slug}/${note.slug}`,
      hierarchy: {
        educationLevel:
          note.topic.subject.program.educationLevel.name,
        program: note.topic.subject.program.name,
        subject: note.topic.subject.name,
        topic: note.topic.name,
      },
    });
  }

  const typeOrder: Record<SearchResultType, number> = {
    note: 0,
    topic: 1,
    subject: 2,
    program: 3,
    "education-level": 4,
  };

  return results.sort((a, b) => {
    const typeDifference =
      typeOrder[a.type] - typeOrder[b.type];

    if (typeDifference !== 0) {
      return typeDifference;
    }

    return a.title.localeCompare(b.title);
  });
}