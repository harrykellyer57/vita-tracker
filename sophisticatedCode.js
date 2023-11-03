/* sophisticatedCode.js */
/* This code demonstrates a sophisticated implementation of an online shopping cart application */

// Utility function to calculate the total amount
function calculateTotalAmount(cartItems) {
  let totalAmount = 0;
  for (let item of cartItems) {
    totalAmount += item.quantity * item.price;
  }
  return totalAmount.toFixed(2);
}

// Class representing a product
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

// Class representing a cart item
class CartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  getItemTotal() {
    return (this.product.price * this.quantity).toFixed(2);
  }
}

// Class representing a shopping cart
class ShoppingCart {
  constructor() {
    this.cartItems = [];
  }

  addToCart(product, quantity) {
    for (let item of this.cartItems) {
      if (item.product.name === product.name) {
        item.quantity += quantity;
        return;
      }
    }
    this.cartItems.push(new CartItem(product, quantity));
  }

  removeFromCart(product) {
    this.cartItems = this.cartItems.filter((item) => item.product.name !== product.name);
  }

  updateQuantity(product, quantity) {
    for (let item of this.cartItems) {
      if (item.product.name === product.name) {
        item.quantity = quantity;
        return;
      }
    }
  }

  getCartTotal() {
    return calculateTotalAmount(this.cartItems);
  }
}

// Example usage of the shopping cart

// Create products
const laptop = new Product("Laptop", 999.99);
const headphones = new Product("Headphones", 199.99);
const mouse = new Product("Mouse", 29.99);

// Create shopping cart instance
const cart = new ShoppingCart();

// Add products to cart
cart.addToCart(laptop, 2);
cart.addToCart(headphones, 1);

// Remove a product from cart
cart.removeFromCart(laptop);

// Update quantity of a product in cart
cart.updateQuantity(headphones, 3);

// Display cart total amount
console.log("Cart Total: $" + cart.getCartTotal());