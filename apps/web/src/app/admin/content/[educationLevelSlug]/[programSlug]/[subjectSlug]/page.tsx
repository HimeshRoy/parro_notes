import TopicsClient from "./TopicsClient";

export const instant = false;

interface TopicsPageProps {
  params: Promise<{
    educationLevelSlug: string;
    programSlug: string;
    subjectSlug: string;
  }>;
}

export default async function TopicsPage({
  params,
}: TopicsPageProps) {
  const {
    educationLevelSlug,
    programSlug,
    subjectSlug,
  } = await params;

  return (
    <TopicsClient
      educationLevelSlug={educationLevelSlug}
      programSlug={programSlug}
      subjectSlug={subjectSlug}
    />
  );
}