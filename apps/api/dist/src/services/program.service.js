import prisma from "../lib/prisma.js";
export async function createProgram(name, slug, educationLevelId, description) {
    return prisma.program.create({
        data: {
            name,
            slug,
            description: description ?? null,
            educationLevelId,
        },
    });
}
export async function getPrograms() {
    return prisma.program.findMany({
        orderBy: {
            name: "asc",
        },
        include: {
            educationLevel: true,
        },
    });
}
export async function getProgramById(id) {
    return prisma.program.findUnique({
        where: {
            id,
        },
        include: {
            educationLevel: true,
        },
    });
}
export async function updateProgram(id, name, slug, educationLevelId, description) {
    return prisma.program.update({
        where: {
            id,
        },
        data: {
            name,
            slug,
            description: description ?? null,
            educationLevelId,
        },
    });
}
export async function deleteProgram(id) {
    return prisma.program.delete({
        where: {
            id,
        },
    });
}
export async function educationLevelExists(id) {
    const educationLevel = await prisma.educationLevel.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
        },
    });
    return educationLevel !== null;
}
//# sourceMappingURL=program.service.js.map