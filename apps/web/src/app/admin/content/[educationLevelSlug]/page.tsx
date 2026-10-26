export const instant = false;

import ProgramsClient from "./ProgramsClient";

interface PageProps {
  params: Promise<{
    educationLevelSlug: string;
  }>;
}

export default async function EducationLevelContentPage({
  params,
}: PageProps) {
  const { educationLevelSlug } = await params;

  return (
    <ProgramsClient
      educationLevelSlug={educationLevelSlug}
    />
  );
}