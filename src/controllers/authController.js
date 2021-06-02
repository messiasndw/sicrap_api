import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Product from '../models/Product.js'
import User from '../models/User.js'
import UserStore from '../auth/userAuth.js'

const authController = {
    
    newToken: (data = {}, expiresIn = '1d') => {
        return jwt.sign({...data}, process.env.APP_KEY, { expiresIn: expiresIn })
    },

    register: async (req,res) => {
        const {email,password,name, gender, birthday} = req.body
        const bcryptPassword = await bcrypt.hash(password, 10)
        
        const x = await User.create({
            email, 
            password: bcryptPassword, 
            gender, 
            birthday
        })

        

        return res.status(500).send(x)

    },

    login: async (req,res) => {
        const {email,password} = req.body
        const result = await bcrypt.hash(password, 10)
        console.log(result)
        const user = await User.findOne({email:email})
        // return res.status(401).send({user})
        if(!user) return res.status(401).send({ok: false, msg: 'Email not registered.'})

        const isValidPassword = await bcrypt.compare(password, user.password)

        if(!isValidPassword) return res.status(401).send({ok: false, msg: 'Invalid password.'})

        const {id} = user

        const token = authController.newToken({id})
        
        return res.status(200).send({ok: true, token: token})
    },

    me: async (req,res) => {
        const products = await User.find()
        const {user} = req.body
        return res.status(200).send({ok: true, me: user, msg: ''})
    },



}

export default authController