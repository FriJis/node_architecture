import _init from '../lib/models'
import sequelize from '../lib/Sequelize'

async function start() {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

;(async () => {
    await start()
    await _init()
})()
