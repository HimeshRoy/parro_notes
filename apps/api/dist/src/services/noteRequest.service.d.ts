type NoteRequestStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "REJECTED";
export declare function createNoteRequest(name: string, email: string, message: string, educationLevelId?: string, programId?: string, subjectId?: string, topicId?: string): Promise<{
    id: string;
    name: string;
    email: string;
    message: string;
    educationLevelId: string | null;
    programId: string | null;
    subjectId: string | null;
    topicId: string | null;
    status: import("../../generated/prisma/enums.js").NoteRequestStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function getAllNoteRequests(page: number, limit: number, status?: NoteRequestStatus): Promise<{
    requests: ({
        educationLevel: {
            id: string;
            name: string;
            slug: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        program: {
            id: string;
            name: string;
            slug: string;
            description: string | null;
            educationLevelId: string;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        subject: {
            id: string;
            name: string;
            slug: string;
            code: string | null;
            description: string | null;
            programId: string;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        topic: {
            id: string;
            name: string;
            slug: string;
            description: string | null;
            subjectId: string;
            createdAt: Date;
            updatedAt: Date;
        } | null;
    } & {
        id: string;
        name: string;
        email: string;
        message: string;
        educationLevelId: string | null;
        programId: string | null;
        subjectId: string | null;
        topicId: string | null;
        status: import("../../generated/prisma/enums.js").NoteRequestStatus;
        createdAt: Date;
        updatedAt: Date;
    })[];
    total: number;
}>;
export declare function getNoteRequestById(id: string): Promise<({
    educationLevel: {
        id: string;
        name: string;
        slug: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null;
    program: {
        id: string;
        name: string;
        slug: string;
        description: string | null;
        educationLevelId: string;
        createdAt: Date;
        updatedAt: Date;
    } | null;
    subject: {
        id: string;
        name: string;
        slug: string;
        code: string | null;
        description: string | null;
        programId: string;
        createdAt: Date;
        updatedAt: Date;
    } | null;
    topic: {
        id: string;
        name: string;
        slug: string;
        description: string | null;
        subjectId: string;
        createdAt: Date;
        updatedAt: Date;
    } | null;
} & {
    id: string;
    name: string;
    email: string;
    message: string;
    educationLevelId: string | null;
    programId: string | null;
    subjectId: string | null;
    topicId: string | null;
    status: import("../../generated/prisma/enums.js").NoteRequestStatus;
    createdAt: Date;
    updatedAt: Date;
}) | null>;
export declare function updateNoteRequestStatus(id: string, status: NoteRequestStatus): Promise<{
    id: string;
    name: string;
    email: string;
    message: string;
    educationLevelId: string | null;
    programId: string | null;
    subjectId: string | null;
    topicId: string | null;
    status: import("../../generated/prisma/enums.js").NoteRequestStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function deleteNoteRequest(id: string): Promise<{
    id: string;
    name: string;
    email: string;
    message: string;
    educationLevelId: string | null;
    programId: string | null;
    subjectId: string | null;
    topicId: string | null;
    status: import("../../generated/prisma/enums.js").NoteRequestStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
export {};
