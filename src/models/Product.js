import mongoose from '../database.js'

const ProductSchema = new mongoose.Schema({
    name: String,
    active: String,
    code: {
        type: String,
    },
    user_id: {
        type: String,
        select: false,
    },
    updatedAt: {
        type: Date,
        select: false
    },
    categories: {
        type: [mongoose.Schema.Types.ObjectId]
    },
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

Product.paginate = async ({ page, perPage, filter }) => {

    const limit = !perPage ? 15 : parseInt(perPage)
    const skip = !page ? 0 : (page - 1) * limit

    const [{ data, amount }] = await Product.aggregate([
        {
            $facet:
            {
                "data": [
                    { $match: { ...filter } },
                    { $lookup: { from: 'categories', localField: 'categories', foreignField: '_id', as: 'categories' } },
                    { $skip: skip },
                    { $limit: limit },
                ],
                "amount": [
                    { $match: { ...filter } },
                    { $group: { _id: filter.user_id, amount: { $sum: 1 } } }
                ],
            }

        }
    ])

    const pagination = {
        totalPages: Math.ceil(amount[0] == undefined ? 0 : amount[0].amount / limit),
        currentPage: !!page ? parseInt(page) : 1,
    }

    return { data, pagination }
}

Product.destroy = async (ids) => {
    const objectIds = ids.map(id => ({ _id: id }))
    return objectIds
}

export default Product