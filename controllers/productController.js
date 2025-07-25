import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
    try {
        const keyword = req.query.search
        ? {  name: { $regex: req.query.search, $options: 'i'}} : {};
        
        const category = req.query.search 
        ? { category: req.query.category } : {};

        const products = await Product.find({ ...keyword, ...category}).sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products' });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(404).json({ message: 'Product not found '});
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching product' });
    }
};


export const createProduct = async (req, res) => {
    const { name, description, price, category, countInStock, image, isFeatured } = req.body;
    try {
        const product = new Product({
            name,
            description,
            price,
            category,
            countInStock,
            image,
            isFeatured,
            createdBy: req.user._id,
        });
        const created = await product.save();
        res.status(201).json(created);
    } catch (err) {
        res.status(500).json({ message: 'Error creating product' });
    }
};

export const updateProduct = async (req, res) => {
  const { name, description, price, category, countInStock, image, isFeatured } = req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;
    product.image = image || product.image;
    product.isFeatured = isFeatured ?? product.isFeatured;

    const updated = await product.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating product' });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.deleteOne();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product' });
  }
};

