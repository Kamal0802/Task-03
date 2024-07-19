
const CartModel = require("../models/cart.model");


const addCart = async (req, res) => {
  try {
    const { user, product, quantity } = req.body;

    let cart = await CartModel.findOne({ user });

    if (cart) {
      const cartIndex = cart.items.findIndex((p) => p.Product == product);

      if (cartIndex > -1) {
        let ProductItem = cart.items[cartIndex];

        ProductItem.quantity = quantity;

        cart.items[cartIndex] = ProductItem;
      } else {
        cart.items.push({ product, quantity });
      }
    } else {
      cart = new CartModel({
        user: user,
        items: [{ product, quantity }],
      });
    }

    cart = await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await CartModel
      .findOne({ user: userId })
      .populate("items.product");

    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const removeCart = async (req, res) => {
  const { user, product } = req.body;

  try {
    let cart = await CartModel.findOne({ user });

    if (cart) {
      cart.items = cart.items.filter((item) => item.product != product);
      cart = await cart.save();
      return res.status(201).json(cart);
    } else {
      return res.status(404).json({ message: "Cart not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { addCart, getCart, removeCart };
