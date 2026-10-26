import prisma from "../lib/prisma.js";
export async function createNoteResource(noteId, type, url, title, publicId) {
    return prisma.noteResource.create({
        data: {
            noteId,
            type,
            url,
            title: title ?? null,
            publicId: publicId ?? null,
        },
    });
}
export async function getNoteResources(noteId) {
    return prisma.noteResource.findMany({
        where: {
            noteId,
        },
        orderBy: {
            createdAt: "asc",
        },
    });
}
export async function getNoteResourceById(id) {
    return prisma.noteResource.findUnique({
        where: {
            id,
        },
        include: {
            note: true,
        },
    });
}
export async function updateNoteResource(id, type, url, title, publicId) {
    return prisma.noteResource.update({
        where: {
            id,
        },
        data: {
            type,
            url,
            title: title ?? null,
            publicId: publicId ?? null,
        },
    });
}
export async function deleteNoteResource(id) {
    return prisma.noteResource.delete({
        where: {
            id,
        },
    });
}
export async function noteExists(id) {
    const note = await prisma.note.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
        },
    });
    return note !== null;
}
//# sourceMappingURL=noteResource.service.js.map