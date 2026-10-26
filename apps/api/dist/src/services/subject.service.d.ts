export declare function createSubject(name: string, slug: string, programId: string, code?: string, description?: string): Promise<{
    id: string;
    name: string;
    slug: string;
    code: string | null;
    description: string | null;
    programId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function getSubjects(): Promise<({
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
})[]>;
export declare function getSubjectById(id: string): Promise<({
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
}) | null>;
export declare function updateSubject(id: string, name: string, slug: string, programId: string, code?: string, description?: string): Promise<{
    id: string;
    name: string;
    slug: string;
    code: string | null;
    description: string | null;
    programId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function deleteSubject(id: string): Promise<{
    id: string;
    name: string;
    slug: string;
    code: string | null;
    description: string | null;
    programId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function programExists(id: string): Promise<boolean>;
