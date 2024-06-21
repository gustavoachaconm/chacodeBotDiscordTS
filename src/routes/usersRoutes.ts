import { Router } from 'express'
import { UsersControllers } from '../controllers/UsersController'
import { Auth } from '../middleware/Auth'

const router = Router()

router.get('/auth/discord', UsersControllers.usersLogin)
router.get('/auth/discord/callback',
    UsersControllers.callback,
    (req, res) => {
        res.redirect('/dashboard');
})
router.get('/logout', UsersControllers.usersLogout)
router.get('/dashboard', Auth.authenticated, (req, res) => {
    res.render('/dashboard', { user: req.user })
})

export default router