const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function DB_GetUserPermissionsByID(userId, serverId) {
    const permissions = await prisma.permissions.findFirst({
            where: {
                userRoleId:userId,
                serverId:serverId,
            },
        });
        if (permissions != null){
            return permissions.permissionLevel
        }else{
            return 0
        }
}

async function DB_CreateUpdate(TableName,Find,Create,Update) {
    const row = await prisma[TableName].findFirst({
        where: Find,
    });
    if (row == null) {
        await prisma[TableName].create({
            data: Create,
        })
    } else {
        await prisma[TableName].updateMany({
            where: Find,
            data: Update,
        });
    }
}

module.exports = {
    prisma,
    DB_GetUserPermissionsByID,
    DB_CreateUpdate,
};