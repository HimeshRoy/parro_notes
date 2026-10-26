export declare function createEducationLevel(name: string, slug: string, description?: string): Promise<{
    id: string;
    name: string;
    slug: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function getEducationLevels(): Promise<{
    id: string;
    name: string;
    slug: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare function getEducationLevelById(id: string): Promise<{
    id: string;
    name: string;
    slug: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
} | null>;
export declare function updateEducationLevel(id: string, name: string, slug: string, description?: string): Promise<{
    id: string;
    name: string;
    slug: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function deleteEducationLevel(id: string): Promise<{
    id: string;
    name: string;
    slug: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
