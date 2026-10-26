export declare function createNote(title: string, slug: string, topicId: string, description?: string): Promise<{
    id: string;
    title: string;
    slug: string;
    description: string | null;
    topicId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function getNotes(): Promise<({
    resources: {
        id: string;
        noteId: string;
        type: import("../../generated/prisma/enums.js").NoteResourceType;
        title: string | null;
        url: string;
        publicId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[];
    topic: {
        subject: {
            program: {
                educationLevel: {
                    id: string;
                    name: string;
                    slug: string;
                    description: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } & {
                id: string;
                name: string;
                slug: string;
                description: string | null;
                educationLevelId: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            name: string;
            slug: string;
            code: string | null;
            description: string | null;
            programId: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        name: string;
        slug: string;
        description: string | null;
        subjectId: string;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    topicId: string;
    createdAt: Date;
    updatedAt: Date;
})[]>;
export declare function getNoteById(id: string): Promise<({
    resources: {
        id: string;
        noteId: string;
        type: import("../../generated/prisma/enums.js").NoteResourceType;
        title: string | null;
        url: string;
        publicId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[];
    topic: {
        subject: {
            program: {
                educationLevel: {
                    id: string;
                    name: string;
                    slug: string;
                    description: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } & {
                id: string;
                name: string;
                slug: string;
                description: string | null;
                educationLevelId: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            name: string;
            slug: string;
            code: string | null;
            description: string | null;
            programId: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        name: string;
        slug: string;
        description: string | null;
        subjectId: string;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    topicId: string;
    createdAt: Date;
    updatedAt: Date;
}) | null>;
export declare function updateNote(id: string, title: string, slug: string, topicId: string, description?: string): Promise<{
    id: string;
    title: string;
    slug: string;
    description: string | null;
    topicId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function deleteNote(id: string): Promise<{
    id: string;
    title: string;
    slug: string;
    description: string | null;
    topicId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function topicExists(id: string): Promise<boolean>;
