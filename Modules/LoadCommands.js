const fs = require('fs');
const Module = require("module");

function LoadCommandsFromDirectory(Directory,Commands = {}) {
    try {
        const files = fs.readdirSync(Directory);

        for (let i = 0; i < files.length; i++) {
            const File = files[i];

            if (File.endsWith(".js")) {
                const Data = require(`${Directory}/${File}`);
                Commands[Data.Integration.name] = Data;
                console.log(`[*] Command ${Data.Integration.name} loaded! ${Directory}`);
            } else {
                const stats = fs.statSync(`${Directory}/${File}`);
                if (stats.isDirectory()) {
                    Commands = LoadCommandsFromDirectory(`${Directory}/${File}`,Commands);
                }
            }
        }
        return Commands
    } catch (err) {
        console.error("[-] Error loading commands..",err);
    }
}

module.exports = {
    LoadCommandsFromDirectory
}

