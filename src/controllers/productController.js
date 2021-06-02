import Product from '../models/Product.js'

const productController = {

    index: async (req,res) => {
        const queryParams = req.query
        const {user} = req.body
        const zz = {
            name: 'asdasd',
            age: undefined,
            people: null,
            kk:22
        }
        const myProducts = await Product.find({
            user_id: user.id,
            name: null
        })
        const z = Object.keys(zz)
        z.forEach(item => !zz[item] && delete zz[item])
        return res.status(200).send(zz)
    },
}

export default productController

