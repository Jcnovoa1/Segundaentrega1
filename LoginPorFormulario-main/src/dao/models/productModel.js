import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const productColecctions = 'products'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    stock: {
        type: Number,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    },
    category:{
        type: String,
    }
})

productSchema.plugin(mongoosePaginate)

export const productModel = mongoose.model(productColecctions, productSchema)