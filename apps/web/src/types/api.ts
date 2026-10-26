export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface EducationLevel {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Program {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  educationLevelId: string;

  educationLevel?: EducationLevel;

  createdAt: string;
  updatedAt: string;
}

export interface Subject {
  id: string;
  name: string;
  slug: string;
  code: string | null;
  description: string | null;
  programId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Topic {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  subjectId: string;
  createdAt: string;
  updatedAt: string;
}

export type NoteResourceType =
  | "PDF"
  | "DOCUMENT"
  | "PRESENTATION"
  | "IMAGE"
  | "VIDEO"
  | "EXTERNAL_LINK";

export interface NoteResource {
  id: string;
  noteId: string;
  type: NoteResourceType;
  title: string | null;
  url: string;
  publicId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  title: string;
  slug: string;
  description: string | null;

  topicId: string;

  topic?: Topic & {
    subject?: Subject & {
      program?: Program & {
        educationLevel?: EducationLevel;
      };
    };
  };

  resources: NoteResource[];

  createdAt: string;
  updatedAt: string;
}

export type NoteRequestStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "REJECTED";

export interface NoteRequest {
  id: string;
  name: string;
  email: string;
  message: string;

  educationLevelId: string | null;
  programId: string | null;
  subjectId: string | null;
  topicId: string | null;

  status: NoteRequestStatus;

  createdAt: string;
  updatedAt: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
}

export interface AdminLoginResponse {
  success: boolean;
  message?: string;
  data: {
    token: string;
    admin: Admin;
  };
}

export type SearchResultType =
  | "note"
  | "topic"
  | "subject"
  | "program"
  | "education-level";

export interface SearchResultHierarchy {
  educationLevel?: string;
  program?: string;
  subject?: string;
  topic?: string;
}

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  description?: string | null;
  slug: string;
  code?: string | null;
  href: string;
  hierarchy: SearchResultHierarchy;
}

export interface SearchResponse {
  query: string;
  results: SearchResult[];
  total: number;
}