export declare function createNoteResource(noteId: string, type: "PDF" | "DOCUMENT" | "PRESENTATION" | "IMAGE" | "VIDEO" | "EXTERNAL_LINK", url: string, title?: string, publicId?: string): Promise<{
    id: string;
    noteId: string;
    type: import("../../generated/prisma/enums.js").NoteResourceType;
    title: string | null;
    url: string;
    publicId: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function getNoteResources(noteId: string): Promise<{
    id: string;
    noteId: string;
    type: import("../../generated/prisma/enums.js").NoteResourceType;
    title: string | null;
    url: string;
    publicId: string | null;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare function getNoteResourceById(id: string): Promise<({
    note: {
        id: string;
        title: string;
        slug: string;
        description: string | null;
        topicId: string;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    id: string;
    noteId: string;
    type: import("../../generated/prisma/enums.js").NoteResourceType;
    title: string | null;
    url: string;
    publicId: string | null;
    createdAt: Date;
    updatedAt: Date;
}) | null>;
export declare function updateNoteResource(id: string, type: "PDF" | "DOCUMENT" | "PRESENTATION" | "IMAGE" | "VIDEO" | "EXTERNAL_LINK", url: string, title?: string, publicId?: string): Promise<{
    id: string;
    noteId: string;
    type: import("../../generated/prisma/enums.js").NoteResourceType;
    title: string | null;
    url: string;
    publicId: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function deleteNoteResource(id: string): Promise<{
    id: string;
    noteId: string;
    type: import("../../generated/prisma/enums.js").NoteResourceType;
    title: string | null;
    url: string;
    publicId: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function noteExists(id: string): Promise<boolean>;
