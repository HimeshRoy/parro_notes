import prisma from "../lib/prisma.js";

export async function createNoteResource(
  noteId: string,
  type:
    | "PDF"
    | "DOCUMENT"
    | "PRESENTATION"
    | "IMAGE"
    | "VIDEO"
    | "EXTERNAL_LINK",
  url: string,
  title?: string,
  publicId?: string,
) {
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

export async function getNoteResources(noteId: string) {
  return prisma.noteResource.findMany({
    where: {
      noteId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function getNoteResourceById(id: string) {
  return prisma.noteResource.findUnique({
    where: {
      id,
    },
    include: {
      note: true,
    },
  });
}

export async function updateNoteResource(
  id: string,
  type:
    | "PDF"
    | "DOCUMENT"
    | "PRESENTATION"
    | "IMAGE"
    | "VIDEO"
    | "EXTERNAL_LINK",
  url: string,
  title?: string,
  publicId?: string,
) {
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

export async function deleteNoteResource(id: string) {
  return prisma.noteResource.delete({
    where: {
      id,
    },
  });
}

export async function noteExists(id: string) {
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
