import prisma from "../lib/prisma.js";
const MAX_RESULTS = 20;
export async function searchController(req, res) {
    try {
        const rawQuery = typeof req.query.q === "string"
            ? req.query.q.trim()
            : "";
        if (!rawQuery) {
            return res.status(200).json({
                success: true,
                data: {
                    query: "",
                    results: [],
                    total: 0,
                },
            });
        }
        const query = rawQuery.slice(0, 100);
        const contains = {
            contains: query,
            mode: "insensitive",
        };
        const [notes, topics, subjects, programs, educationLevels,] = await Promise.all([
            prisma.note.findMany({
                where: {
                    OR: [
                        { title: contains },
                        { slug: contains },
                        { description: contains },
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
                take: MAX_RESULTS,
                orderBy: {
                    updatedAt: "desc",
                },
            }),
            prisma.topic.findMany({
                where: {
                    OR: [
                        { name: contains },
                        { slug: contains },
                        { description: contains },
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
                take: MAX_RESULTS,
                orderBy: {
                    updatedAt: "desc",
                },
            }),
            prisma.subject.findMany({
                where: {
                    OR: [
                        { name: contains },
                        { slug: contains },
                        { code: contains },
                        { description: contains },
                    ],
                },
                include: {
                    program: {
                        include: {
                            educationLevel: true,
                        },
                    },
                },
                take: MAX_RESULTS,
                orderBy: {
                    updatedAt: "desc",
                },
            }),
            prisma.program.findMany({
                where: {
                    OR: [
                        { name: contains },
                        { slug: contains },
                        { description: contains },
                    ],
                },
                include: {
                    educationLevel: true,
                },
                take: MAX_RESULTS,
                orderBy: {
                    updatedAt: "desc",
                },
            }),
            prisma.educationLevel.findMany({
                where: {
                    OR: [
                        { name: contains },
                        { slug: contains },
                        { description: contains },
                    ],
                },
                take: MAX_RESULTS,
                orderBy: {
                    updatedAt: "desc",
                },
            }),
        ]);
        const results = [
            ...notes.map((note) => ({
                id: note.id,
                type: "note",
                title: note.title,
                description: note.description,
                slug: note.slug,
                hierarchy: {
                    educationLevel: note.topic.subject.program.educationLevel.name,
                    program: note.topic.subject.program.name,
                    subject: note.topic.subject.name,
                    topic: note.topic.name,
                },
            })),
            ...topics.map((topic) => ({
                id: topic.id,
                type: "topic",
                title: topic.name,
                description: topic.description,
                slug: topic.slug,
                hierarchy: {
                    educationLevel: topic.subject.program.educationLevel.name,
                    program: topic.subject.program.name,
                    subject: topic.subject.name,
                    topic: topic.name,
                },
            })),
            ...subjects.map((subject) => ({
                id: subject.id,
                type: "subject",
                title: subject.name,
                description: subject.description,
                slug: subject.slug,
                code: subject.code,
                hierarchy: {
                    educationLevel: subject.program.educationLevel.name,
                    program: subject.program.name,
                    subject: subject.name,
                },
            })),
            ...programs.map((program) => ({
                id: program.id,
                type: "program",
                title: program.name,
                description: program.description,
                slug: program.slug,
                hierarchy: {
                    educationLevel: program.educationLevel.name,
                    program: program.name,
                },
            })),
            ...educationLevels.map((level) => ({
                id: level.id,
                type: "education-level",
                title: level.name,
                description: level.description,
                slug: level.slug,
                hierarchy: {
                    educationLevel: level.name,
                },
            })),
        ];
        return res.status(200).json({
            success: true,
            data: {
                query,
                results: results.slice(0, MAX_RESULTS),
                total: results.length,
            },
        });
    }
    catch (error) {
        console.error("Search error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to search notes right now.",
            data: null,
        });
    }
}
//# sourceMappingURL=search.controller.js.map