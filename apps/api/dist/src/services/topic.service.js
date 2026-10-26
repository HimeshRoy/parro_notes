import prisma from "../lib/prisma.js";
export async function createTopic(name, slug, subjectId, description) {
    return prisma.topic.create({
        data: {
            name,
            slug,
            description: description ?? null,
            subjectId,
        },
    });
}
export async function getTopics() {
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
export async function getTopicById(id) {
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
export async function updateTopic(id, name, slug, subjectId, description) {
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
export async function deleteTopic(id) {
    return prisma.topic.delete({
        where: {
            id,
        },
    });
}
export async function subjectExists(id) {
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
//# sourceMappingURL=topic.service.js.map