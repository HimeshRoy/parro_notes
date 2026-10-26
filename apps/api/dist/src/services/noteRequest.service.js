import prisma from "../lib/prisma.js";
export async function createNoteRequest(name, email, message, educationLevelId, programId, subjectId, topicId) {
    return prisma.noteRequest.create({
        data: {
            name,
            email,
            message,
            educationLevelId: educationLevelId ?? null,
            programId: programId ?? null,
            subjectId: subjectId ?? null,
            topicId: topicId ?? null,
        },
    });
}
export async function getAllNoteRequests(page, limit, status) {
    const skip = (page - 1) * limit;
    const where = status
        ? {
            status,
        }
        : {};
    const [requests, total] = await prisma.$transaction([
        prisma.noteRequest.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                educationLevel: true,
                program: true,
                subject: true,
                topic: true,
            },
        }),
        prisma.noteRequest.count({
            where,
        }),
    ]);
    return {
        requests,
        total,
    };
}
export async function getNoteRequestById(id) {
    return prisma.noteRequest.findUnique({
        where: { id },
        include: {
            educationLevel: true,
            program: true,
            subject: true,
            topic: true,
        },
    });
}
export async function updateNoteRequestStatus(id, status) {
    return prisma.noteRequest.update({
        where: { id },
        data: {
            status,
        },
    });
}
export async function deleteNoteRequest(id) {
    return prisma.noteRequest.delete({
        where: { id },
    });
}
//# sourceMappingURL=noteRequest.service.js.map