import sequelize from '../../Sequelize'
import { DataTypes } from 'sequelize'
import { UserModel } from '../../types/User'
import { createPass } from '../../utils/Password'

export const User = sequelize.define<UserModel>(
    'user',
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(255),
            allowNull: true,
        },
        email: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        password: {
            type: new DataTypes.STRING(255),
            allowNull: false,
            set(value: string) {
                this.setDataValue('password', createPass(value))
            },
        },
    },
    {
        tableName: 'users',
    }
)
