import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })
import { DataTypes, Sequelize } from 'sequelize'
import { Roles } from './middlewares/AuthMiddleware'

const siteDB = new Sequelize(
	process.env.NODE_ENV === 'prod' ? process.env.DB_NAME : process.env.DB_LNAME,
	process.env.NODE_ENV === 'prod' ? process.env.DB_USER : process.env.DB_LUSER,
	process.env.NODE_ENV === 'prod' ? process.env.DB_PASSWORD : process.env.DB_LPASSWORD, {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: 'mysql',
	}
)

export const Admins = siteDB.define('admins', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
    },
    code: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.STRING,
    }
}, {
    updatedAt: false
})


export default siteDB