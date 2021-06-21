import express from 'express'
import userController from './controllers/userController.js'
import authController from './controllers/authController.js'
import productController from './controllers/productController.js'
import authMiddleware from './middlewares/auth.js'
import * as validator from './middlewares/validators/index.js'

const router = express.Router()

router.get('/', (req, res) => {

})

router.post('/register',
    validator.userValidatorRules("create"),
    validator.userValidate,
    authController.register
)

router.post('/login', authController.login)
router.post('/me', authMiddleware, authController.me)
router.post('/profile',
    authMiddleware,
    validator.userValidatorRules("update"),
    validator.userValidate,
    userController.profile
)


// PRODUCTS
router.get('/products',
    authMiddleware,
    validator.productValidatorRules('index'),
    validator.productValidate,
    productController.myproducts
)
router.post('/products',
    authMiddleware,
    validator.productValidatorRules('store'),
    validator.productValidate,
    productController.store
)
router.delete('/products',
    authMiddleware,
    validator.productValidatorRules('destroy'),
    validator.productValidate,
    productController.destroy
)
router.put('/products',
    authMiddleware,
    validator.productValidatorRules('update'),
    validator.productValidate,
    productController.update
)


export default router