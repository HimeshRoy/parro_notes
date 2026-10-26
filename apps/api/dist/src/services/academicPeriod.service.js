import prisma from "../lib/prisma.js";
export async function createAcademicPeriod(name, slug, programId, description) {
    return prisma.academicPeriod.create({
        data: {
            name,
            slug,
            description: description ?? null,
            programId,
        },
    });
}
export async function getAcademicPeriods() {
    return prisma.academicPeriod.findMany({
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
export async function getAcademicPeriodById(id) {
    return prisma.academicPeriod.findUnique({
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
export async function updateAcademicPeriod(id, name, slug, programId, description) {
    return prisma.academicPeriod.update({
        where: {
            id,
        },
        data: {
            name,
            slug,
            description: description ?? null,
            programId,
        },
    });
}
export async function deleteAcademicPeriod(id) {
    return prisma.academicPeriod.delete({
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
//# sourceMappingURL=academicPeriod.service.js.map