import prisma from "../lib/prisma.js";
export async function createEducationLevel(name, slug, description) {
    return prisma.educationLevel.create({
        data: {
            name,
            slug,
            description: description ?? null,
        },
    });
}
export async function getEducationLevels() {
    return prisma.educationLevel.findMany({
        orderBy: {
            name: "asc",
        },
    });
}
export async function getEducationLevelById(id) {
    return prisma.educationLevel.findUnique({
        where: {
            id,
        },
    });
}
export async function updateEducationLevel(id, name, slug, description) {
    return prisma.educationLevel.update({
        where: {
            id,
        },
        data: {
            name,
            slug,
            description: description ?? null,
        },
    });
}
export async function deleteEducationLevel(id) {
    return prisma.educationLevel.delete({
        where: {
            id,
        },
    });
}
//# sourceMappingURL=educationLevel.service.js.map