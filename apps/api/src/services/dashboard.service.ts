import prisma from "../lib/prisma.js";

export async function getDashboardStats() {
  const [
    educationLevels,
    programs,
    subjects,
    topics,
    notes,
    resources,
    requests,
  ] = await Promise.all([
    prisma.educationLevel.count(),
    prisma.program.count(),
    prisma.subject.count(),
    prisma.topic.count(),
    prisma.note.count(),
    prisma.noteResource.count(),
    prisma.noteRequest.count(),
  ]);

  return {
    educationLevels,
    programs,
    subjects,
    topics,
    notes,
    resources,
    requests,
  };
}