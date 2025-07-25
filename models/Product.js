import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
        name:{
            type: String,
            required: [true, 'Product name is required'], 
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            default: 0,
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
        },
        countInStock: {
            type: Number,
            required: [true, 'Stock is required'],
            default: 0,
        },
        image: {
            type: String,
            default: '/uploads/sample.jpg',
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },{ timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;