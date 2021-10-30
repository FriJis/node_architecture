import { DataTypes, Sequelize } from 'sequelize'
import { Env } from './Env'

const sequelize = new Sequelize(Env.postgres.url, {
    logging: false,
})

export default sequelize

export function addId() {
    return {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    }
}
