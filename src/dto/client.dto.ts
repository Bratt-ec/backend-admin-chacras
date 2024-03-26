import { DataTypes } from 'sequelize';
import { psql } from '../database/db';

export const clientDTO = psql.define('tb_clients', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    names: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastNames: {
        type: DataTypes.STRING
    },
    cedula: {
        type: DataTypes.STRING,
        unique: true
    },
    phone: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    number_meter: {
        type: DataTypes.STRING
    },
    consumption: {
        type: DataTypes.STRING
    },
},{
    timestamps: true,
    createdAt: true,
    updatedAt: true
});