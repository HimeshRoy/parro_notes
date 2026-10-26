import prisma from "../lib/prisma.js";
export async function createAdmin(name, email, passwordHash) {
    return prisma.admin.create({
        data: {
            name,
            email,
            passwordHash,
        },
        select: {
            id: true,
            name: true,
            email: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            lastLoginAt: true,
        },
    });
}
export async function findAdminByEmail(email) {
    return prisma.admin.findUnique({
        where: {
            email,
        },
    });
}
export async function findAdminById(id) {
    return prisma.admin.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            lastLoginAt: true,
        },
    });
}
export async function updateAdminLastLogin(id) {
    return prisma.admin.update({
        where: {
            id,
        },
        data: {
            lastLoginAt: new Date(),
        },
    });
}
//# sourceMappingURL=admin.service.js.map