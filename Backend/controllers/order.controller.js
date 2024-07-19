
const orderModel = require("../models/order.model")

const user=require("../models/user.model")

const product = require("../models/product.model")


const addOrder= async (req, res) => {
  const { user, orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
  console.log(orderItems);

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }

  const order = new orderModel({
    user,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice
  });

  try {
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};




const getOrderById = async (req, res) => {
  try {
    
    let {id}=req.params
    const orders = await orderModel.find({user:id})
      .populate('user','userName email')
      .populate('orderItems.product','name price image');

    res.status(200).json(orders);
  } catch (error) {

    console.log(error);
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
    addOrder,
  getOrderById
};



