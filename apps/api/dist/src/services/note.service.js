import prisma from "../lib/prisma.js";
export async function createNote(title, slug, topicId, description) {
    return prisma.note.create({
        data: {
            title,
            slug,
            description: description ?? null,
            topicId,
        },
    });
}
export async function getNotes() {
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
export async function getNoteById(id) {
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
export async function updateNote(id, title, slug, topicId, description) {
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
export async function deleteNote(id) {
    return prisma.note.delete({
        where: {
            id,
        },
    });
}
export async function topicExists(id) {
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
//# sourceMappingURL=note.service.js.map