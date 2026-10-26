import prisma from "../lib/prisma.js";

type NoteRequestStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "REJECTED";

export async function createNoteRequest(
  name: string,
  email: string,
  message: string,
  educationLevelId?: string,
  programId?: string,
  subjectId?: string,
  topicId?: string,
) {
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

export async function getAllNoteRequests(
  page: number,
  limit: number,
  status?: NoteRequestStatus,
) {
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

export async function getNoteRequestById(id: string) {
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

export async function updateNoteRequestStatus(
  id: string,
  status: NoteRequestStatus,
) {
  return prisma.noteRequest.update({
    where: { id },
    data: {
      status,
    },
  });
}

export async function deleteNoteRequest(id: string) {
  return prisma.noteRequest.delete({
    where: { id },
  });
}