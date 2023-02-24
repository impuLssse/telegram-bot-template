import express from 'express'
import AdminsRouter from './admins'
import AuthRouter from './auth'

let router = express()

router.use('/auth', AuthRouter)
router.use('/admins', AdminsRouter)

export default router