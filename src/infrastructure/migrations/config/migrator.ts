
import { SequelizeStorage, Umzug } from "umzug"
import { join, } from "path"
import { Sequelize } from "sequelize"


export const migrator = (sequelize: Sequelize) => {

    return new Umzug({
        migrations: {
            glob: [
                "tables/*.{js,ts}", // Comece diretamente de "tables"
                {
                    cwd: join(__dirname, "../"), // Base é "../migration"
                    ignore: ["**/*.d.ts", "**/index.ts", "**/index.js"],
                },
            ],
        },
        context: sequelize,
        storage: new SequelizeStorage({ sequelize }),
        logger: console,
    });
};

