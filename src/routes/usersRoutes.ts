import { Router } from 'express'
import { UsersControllers } from '../controllers/UsersController'
import { Auth } from '../middleware/Auth'

const router = Router()

router.get('/auth/discord', UsersControllers.usersLogin)


router.get('/auth/discord/callback',UsersControllers.callback)
router.get('/logout', UsersControllers.usersLogout)
router.get('/dashboard', Auth.authenticated)

export default router