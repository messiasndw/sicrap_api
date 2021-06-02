import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import UserStore from '../auth/userAuth.js'


export default (req, res, next) => {

    const response = {ok: false, msg:"Your session expired, please log in again."}

    if (!req.headers.authorization) return res.status(401).send(response)

    const [type, token] = req.headers.authorization.split(' ')

    if (type != 'Bearer') res.status(401).send(response)

    if (!!!token) res.status(401).send(response)

    jwt.verify(token, process.env.APP_KEY, async (err, decoded) => {

        if (err) {
            let msg = 'Invalid access token, please log in again.'

            if(err.name == 'TokenExpiredError'){
                msg = 'Your session expired, please log in again.'
            }
            return res.status(401).send({ok: false, msg: msg})
        }

        const user = await User.findById(decoded.id)
        console.log(user)
        if (!user) res.status(401).send(response)

        delete user._doc.password
        delete user._doc._id

        req.body.user = {...user._doc}
        return next()
    })
}
