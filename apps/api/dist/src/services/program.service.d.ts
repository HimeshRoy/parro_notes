export declare function createProgram(name: string, slug: string, educationLevelId: string, description?: string): Promise<{
    id: string;
    name: string;
    slug: string;
    description: string | null;
    educationLevelId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function getPrograms(): Promise<({
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
})[]>;
export declare function getProgramById(id: string): Promise<({
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
}) | null>;
export declare function updateProgram(id: string, name: string, slug: string, educationLevelId: string, description?: string): Promise<{
    id: string;
    name: string;
    slug: string;
    description: string | null;
    educationLevelId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function deleteProgram(id: string): Promise<{
    id: string;
    name: string;
    slug: string;
    description: string | null;
    educationLevelId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function educationLevelExists(id: string): Promise<boolean>;
