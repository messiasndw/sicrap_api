import express from 'express'
import userController from './controllers/userController.js'
import authController from './controllers/authController.js'
import productController from './controllers/productController.js'
import authMiddleware from './middlewares/auth.js'

const router = express.Router()

router.get('/', (req, res) => {

})

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/me', authMiddleware, authController.me)
router.get('/products', authMiddleware, productController.index)

export default router