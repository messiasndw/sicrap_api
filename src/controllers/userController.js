
import User from '../models/User.js'

const userController =  {

    profile: async (req, res) => {
        const {user} = req.body
        const {name, gender, email} = req.body
        try {
            const userDoc = await User.findById(user._id)
            userDoc.set({name,gender,email})
            const updatedUserDoc = await userDoc.save()
            return res.status(200).send({ok:true,msg:"Profile updated successfuly!", user: {...updatedUserDoc.toJSON()}})
        } catch (error) {
            return res.status(500).send(error)
        }
    }
}

export default userController

