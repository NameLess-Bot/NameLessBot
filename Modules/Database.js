const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function GetUserPermissionsByID(userId, serverId) {
    try {
        const permissions = await prisma.permissions.findFirst({
            where: {
                id:userId,
                serverId:serverId,
            },
        });
        return permissions;
    } catch (error) {
        console.error('Error retrieving permissions:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

module.exports = {
    prisma,
    GetUserPermissionsByID,
};