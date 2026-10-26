export declare function createAdmin(name: string, email: string, passwordHash: string): Promise<{
    createdAt: Date;
    email: string;
    id: string;
    isActive: boolean;
    lastLoginAt: Date | null;
    name: string;
    updatedAt: Date;
}>;
export declare function findAdminByEmail(email: string): Promise<{
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    lastLoginAt: Date | null;
} | null>;
export declare function findAdminById(id: string): Promise<{
    createdAt: Date;
    email: string;
    id: string;
    isActive: boolean;
    lastLoginAt: Date | null;
    name: string;
    updatedAt: Date;
} | null>;
export declare function updateAdminLastLogin(id: string): Promise<{
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    lastLoginAt: Date | null;
}>;
