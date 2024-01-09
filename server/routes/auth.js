import { Router } from 'express'
import { register, login, getme } from '../controllers/auth.js'
import { checkAuth } from '../utils/checkAuth.js'
const router = new Router()

// Register
router.post('/register', register)
// Login
router.post('/login', login)
// Get Me
router.get('/me', checkAuth, getme)


export default router