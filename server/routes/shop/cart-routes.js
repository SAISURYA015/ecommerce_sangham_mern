const express = require('express');

const {
  addToCart,
  fetchCartItems,
  updateCartItemQty,
  deleteCartItem
} = require('../../controllers/shop/cart-controller');

const router = express.Router();

router.post('/add', addToCart)
router.post('/get/:userId', fetchCartItems)
router.post('/update-cart', updateCartItemQty)
router.post('/:userId/:productId', deleteCartItem)

module.exports = router