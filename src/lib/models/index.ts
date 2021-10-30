import sequelize from '../Sequelize'

const _init = async (config?: { alter?: boolean; force?: boolean }) => {
    await sequelize.sync(config)
}

export default _init
