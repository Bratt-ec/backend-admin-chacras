import { DataTypes } from 'sequelize';
import { psql } from '../database/db';

export const paymentDTO = psql.define('tb_payment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    client: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date_emission: {
        type: DataTypes.DATE
    },
    date_expiry: {
        type: DataTypes.DATE
    },
    current_consumption: {
        type: DataTypes.STRING,
        unique: true
    },
    last_consumption: {
        type: DataTypes.STRING
    },
    month: {
        type: DataTypes.STRING
    },
    code: {
        type: DataTypes.STRING
    },
    num_payment_info: {
        type: DataTypes.STRING
    },
    pay_consumption: {
        type: DataTypes.NUMBER
    },
    debt_pending: {
        type: DataTypes.NUMBER
    },
    is_new_connection: {
        type: DataTypes.BOOLEAN
    },
    is_reconnection: {
        type: DataTypes.BOOLEAN
    },
    interest_due: {
        type: DataTypes.NUMBER
    },
    total_pay: {
        type: DataTypes.NUMBER
    },
},{
    timestamps: true,
    createdAt: true,
    updatedAt: true
});