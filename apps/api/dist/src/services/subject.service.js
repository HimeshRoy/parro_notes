import prisma from "../lib/prisma.js";
export async function createSubject(name, slug, programId, code, description) {
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
export async function getSubjectById(id) {
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
export async function updateSubject(id, name, slug, programId, code, description) {
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
export async function deleteSubject(id) {
    return prisma.subject.delete({
        where: {
            id,
        },
    });
}
export async function programExists(id) {
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
//# sourceMappingURL=subject.service.js.map