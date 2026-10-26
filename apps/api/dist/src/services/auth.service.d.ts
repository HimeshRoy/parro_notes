export declare function registerAdmin(name: string, email: string, password: string): Promise<{
    createdAt: Date;
    email: string;
    id: string;
    isActive: boolean;
    lastLoginAt: Date | null;
    name: string;
    updatedAt: Date;
}>;
export declare function loginAdmin(email: string, password: string): Promise<{
    token: string;
    admin: {
        createdAt: Date;
        email: string;
        id: string;
        isActive: boolean;
        lastLoginAt: Date | null;
        name: string;
        updatedAt: Date;
    } | null;
}>;
