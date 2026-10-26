import NoteClient from "./NoteClient";

export const instant = false;

interface NotePageProps {
  params: Promise<{
    educationLevelSlug: string;
    programSlug: string;
    subjectSlug: string;
    topicSlug: string;
    noteSlug: string;
  }>;
}

export default async function NotePage({
  params,
}: NotePageProps) {
  const {
    educationLevelSlug,
    programSlug,
    subjectSlug,
    topicSlug,
    noteSlug,
  } = await params;

  return (
    <NoteClient
      educationLevelSlug={educationLevelSlug}
      programSlug={programSlug}
      subjectSlug={subjectSlug}
      topicSlug={topicSlug}
      noteSlug={noteSlug}
    />
  );
}