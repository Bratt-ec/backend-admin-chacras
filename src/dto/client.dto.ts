import { DataTypes, ENUM } from 'sequelize';
import { psql } from '../database/db';
import { PaymentDTO } from './payments.dto';

export enum STATUS_PAY  {
    PAID = 'PAID',
    DEBT = 'DEBT',
    NONE = 'NONE'
}

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
    status_payment: {
        type: DataTypes.ENUM('PAID','DEBT','NONE' ),
        defaultValue: 'NONE'
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
},{
    timestamps: true,
    createdAt: true,
    updatedAt: true
});

// clientDTO.drop();
