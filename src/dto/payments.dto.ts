import { DataTypes } from 'sequelize';
import { psql } from '../database/db';
import { clientDTO } from './client.dto';

export const PaymentDTO = psql.define('tb_payment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    tb_client_id: {
        type: DataTypes.UUID,
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
        // unique: true
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
        type: DataTypes.INTEGER
    },
    pay_consumption: {
        type: DataTypes.DOUBLE
    },
    debt_pending: {
        type: DataTypes.DOUBLE
    },
    is_new_connection: {
        type: DataTypes.BOOLEAN
    },
    is_reconnection: {
        type: DataTypes.BOOLEAN
    },
    interest_due: {
        type: DataTypes.DOUBLE
    },
    total_pay: {
        type: DataTypes.DOUBLE
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

// PaymentDTO.drop({cascade: true});
PaymentDTO.belongsTo(clientDTO, { foreignKey: 'tb_client_id' });
