import SubjectsClient from "./SubjectsClient";

export const instant = false;

interface SubjectsPageProps {
  params: Promise<{
    educationLevelSlug: string;
    programSlug: string;
  }>;
}

export default async function SubjectsPage({
  params,
}: SubjectsPageProps) {
  const { educationLevelSlug, programSlug } =
    await params;

  return (
    <SubjectsClient
      educationLevelSlug={educationLevelSlug}
      programSlug={programSlug}
    />
  );
}