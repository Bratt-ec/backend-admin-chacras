import { DataTypes } from 'sequelize';
import { psql } from '../database/db';

export const UserDTO = psql.define('tb_users_admin', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    names: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastNames: {
        type: DataTypes.STRING
    },
    cedula: {
        type: DataTypes.STRING,
        unique: true
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
},{
    timestamps: true,
    createdAt: true,
    updatedAt: true
});