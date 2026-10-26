import NotesClient from "./NotesClient";

export const instant = false;

interface NotesPageProps {
  params: Promise<{
    educationLevelSlug: string;
    programSlug: string;
    subjectSlug: string;
    topicSlug: string;
  }>;
}

export default async function NotesPage({
  params,
}: NotesPageProps) {
  const {
    educationLevelSlug,
    programSlug,
    subjectSlug,
    topicSlug,
  } = await params;

  return (
    <NotesClient
      educationLevelSlug={educationLevelSlug}
      programSlug={programSlug}
      subjectSlug={subjectSlug}
      topicSlug={topicSlug}
    />
  );
}