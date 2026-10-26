import "dotenv/config";
export interface AdminJwtPayload {
    adminId: string;
}
export declare function signAdminToken(adminId: string): string;
export declare function verifyAdminToken(token: string): AdminJwtPayload;
