import type { MetadataRoute } from "next";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:5000/api";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://parronotes.vercel.app";

interface EducationLevel {
  id: string;
  slug: string;
}

interface Program {
  id: string;
  slug: string;
  educationLevelId: string;
}

interface Subject {
  id: string;
  slug: string;
  programId: string;
}

interface Topic {
  id: string;
  slug: string;
  subjectId: string;
  subject?: {
    programId: string;
  };
}

interface Note {
  id: string;
  slug: string;
  topicId: string;
  topic?: {
    subjectId: string;
  };
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  const result = (await response.json()) as ApiResponse<T>;

  return result.data;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/notes`,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/search`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/request`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  try {
    const educationLevels =
      await fetchApi<EducationLevel[]>("/education-levels");

    for (const educationLevel of educationLevels) {
      urls.push({
        url: `${SITE_URL}/notes/${educationLevel.slug}`,
        changeFrequency: "weekly",
        priority: 0.9,
      });

      const programs = await fetchApi<Program[]>(
        `/programs?educationLevelId=${educationLevel.id}`,
      );

      for (const program of programs) {
        urls.push({
          url: `${SITE_URL}/notes/${educationLevel.slug}/${program.slug}`,
          changeFrequency: "weekly",
          priority: 0.85,
        });

        const subjects = await fetchApi<Subject[]>(
          `/subjects?programId=${program.id}`,
        );

        for (const subject of subjects) {
          urls.push({
            url: `${SITE_URL}/notes/${educationLevel.slug}/${program.slug}/${subject.slug}`,
            changeFrequency: "weekly",
            priority: 0.8,
          });

          const topics = await fetchApi<Topic[]>(
            `/topics?subjectId=${subject.id}`,
          );

          for (const topic of topics) {
            urls.push({
              url: `${SITE_URL}/notes/${educationLevel.slug}/${program.slug}/${subject.slug}/${topic.slug}`,
              changeFrequency: "weekly",
              priority: 0.75,
            });

            const notes = await fetchApi<Note[]>(
              `/notes?topicId=${topic.id}`,
            );

            for (const note of notes) {
              urls.push({
                url: `${SITE_URL}/notes/${educationLevel.slug}/${program.slug}/${subject.slug}/${topic.slug}/${note.slug}`,
                changeFrequency: "monthly",
                priority: 0.7,
              });
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Failed to generate sitemap:", error);
  }

  return urls;
}