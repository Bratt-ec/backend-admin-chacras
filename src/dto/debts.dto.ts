import { DataTypes } from 'sequelize';
import { psql } from '../database/db';
import { clientDTO } from './client.dto';

export const DebtDTO = psql.define('tb_debts',{
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
    interest_due: {
        type: DataTypes.DOUBLE
    },
    month:{
        type: DataTypes.INTEGER
    },
    year:{
        type: DataTypes.INTEGER
    },
    total_debt: {
        type: DataTypes.DOUBLE
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    debt_status: {
        type: DataTypes.STRING,
        defaultValue: 'pending'
    },
},{
    timestamps: true,
    createdAt: true,
    updatedAt: true
})

DebtDTO.belongsTo(clientDTO, { foreignKey: 'tb_client_id' });