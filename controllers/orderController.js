import Order from '../models/Order.js';
import sendEmail from '../utils/sendEmail.js';

export const addOrder = async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    }

    const order = new Order({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    });

    const createdOrder = await order.save();

    const userEmail = req.user.email;
    const subject = '🧾 Order Confirmation - MERN Store';
    const html = `
            <h2>Thank you for your order!</h2>
            <p>Your order ID: <strong>${createdOrder._id}</strong></p>
            <p>Toatl: ₹${createdOrder.totalPrice.toFixed(2)}</p>
            <p>Status: ${createdOrder.status}</p>
            <br/>
            <p>We'll notify you when order ships.</p>
    `;
    sendEmail(userEmail, subject, html);
    res.status(201).json(createdOrder);
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
  res.json(orders);
};

export const getMyOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json(orders);
};

export const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};


export const updateOrderToPaid = async (req, res) => {
  // const order = await Order.findById(req.params.id);
  // if (order) {
  //   order.isPaid = true;
  //   order.paidAt = Date.now();
  //   order.paymentResult = {
  //     id: req.body.id,
  //     status: req.body.status,
  //     email_address: req.body.email_address,
  //   };

  //   const updatedOrder = await order.save();
  //   res.json(updatedOrder);
  // } else {
  //   res.status(404).json({ message: 'Order not found' });
  // }
  const order = await Order.findById(req.params.id);

  if (!order) return res.status(404).json({ message: 'Order not found' });

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: `demo_${order._id}`,
    status: 'COMPLETED',
    email_address: req.user.email,
  };

  const updatedOrder = await order.save();
  res.json({
    message: 'Payment successful (demo)',
    order: updatedOrder,
  });
};

export const updateOrderToDelivered = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    order.status = 'Delivered';

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};



