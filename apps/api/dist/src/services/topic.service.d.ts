export declare function createTopic(name: string, slug: string, subjectId: string, description?: string): Promise<{
    id: string;
    name: string;
    slug: string;
    description: string | null;
    subjectId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function getTopics(): Promise<({
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
})[]>;
export declare function getTopicById(id: string): Promise<({
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
}) | null>;
export declare function updateTopic(id: string, name: string, slug: string, subjectId: string, description?: string): Promise<{
    id: string;
    name: string;
    slug: string;
    description: string | null;
    subjectId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function deleteTopic(id: string): Promise<{
    id: string;
    name: string;
    slug: string;
    description: string | null;
    subjectId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function subjectExists(id: string): Promise<boolean>;
