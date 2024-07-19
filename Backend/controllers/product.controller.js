const productModel = require("../models/product.model")

getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

getProductById = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

addProduct = async (req, res) => {
  const product = new productModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
    category: req.body.category,
    stock: req.body.stock,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json(err);
  }
};

addReview = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const review = {
      user: req.body.user,
      rating: req.body.rating,
      comment: req.body.comment,
    };
    product.reviews.push(review);
    product.calculateAverageRating();

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { getAllProducts, getProductById, addProduct, addReview };
