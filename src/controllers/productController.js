import Product from '../models/Product.js'

const productController = {

    myproducts: async (req, res) => {

        const queryParams = req.query
        const { user } = req.body
        const { perPage, page, active, name, code } = queryParams

        const filter = {
            user_id: user._id.toString(),
            name: { $regex: !!name ? name : '', $options: 'i' },
            code: { $regex: !!code ? code : '', $options: 'i' },
            active,
        }

        Object.keys(filter).forEach(key => filter[key] === undefined && delete filter[key])

        console.log(filter)
        const { data, pagination } = await Product.paginate({ page, perPage, filter })

        return res.status(200).send({ ok: true, msg: data.length + ' products found!', pagination, data })
    },

    store: async (req, res) => {

        const { name, code, active } = req.body
        const { user } = req.body

        try {
            const x = await Product.create({
                name,
                code,
                active,
                user_id: user._id
            })

            return res.status(201).send({ ok: true, msg: "New product created successfully!", x: x, })
        } catch (error) {
            return res.status(201).send({ ok: false, error })
        }

    },

    destroy: async (req, res) => {

        const { user, ids } = req.body

        try {
            const result = await Product.deleteMany({ _id: { $in: ids }, user_id: user._id })
            return res.status(200).send({ msg: `${result.n} products deleted successfully!`, ok: true, result })
        } catch (error) {
            return res.status(500).send(error)
        }


    },

    update: async (req, res) => {
        const { user, code, name, active, _id } = req.body
        try {
            const data = await Product.aggregate([])
            .lookup({from: 'categories', localField: 'categories', foreignField:'_id', as:'categories'})
            // .match({_id: {"$in":_id}})

            console.log("___")
            console.log(data)
            return res.send(data)
        } catch (error) {
            return res.send("error")
        }
        return res.send("3")
    },

    update2: async (req, res) => {

        const { user, code, name, active, _id } = req.body
        try {
            const data = await Product.findOne({ user_id: user._id, _id: _id })
            if (!!data) {
                data.set({ code, name, active })
                return res.send({ ok: true, msg: 'Product updated successfulyl!', data })
            }

            return res.send(data)
        } catch (error) {
            return res.send(2)
        }

    }
}

export default productController

