import { Sequelize, UUIDV4 } from "sequelize";

export const psql = new Sequelize('utmach_proy', 'postgres', 'admin2023', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
});

export async function connectPostgres(){
    try {
        await psql.authenticate();
        await psql.sync()
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export const DB_UUID = new UUIDV4();