import { DataTypes, Optional, ModelDefined } from 'sequelize';
import { sequelize } from '../db';
import { IUsers } from '../types/databaseTypes';

export type UserCreationAttributes = Optional<IUsers, 'id' | 'createdAt' | 'updatedAt'| 'last_login_time' | 'registration_time' | 'status'>;

export const Users: ModelDefined<IUsers, UserCreationAttributes> = sequelize.define('Users', {
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

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    last_login_time: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
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