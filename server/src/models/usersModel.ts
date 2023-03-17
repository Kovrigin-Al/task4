import { DataTypes } from 'sequelize'
import { sequelize } from '../db'

export const Users = sequelize.define(
    'Users', {

    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },

    last_login_time: {
        type: DataTypes.DATE,
        allowNull: true
    },

    registration_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },

    status: {
        type: DataTypes.ENUM('active', 'blocked'),
        allowNull: false,
        defaultValue: 'active'
    }
});