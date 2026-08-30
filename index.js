// @ts-nocheck

const inventory = [
  {
    id: 101,
    name: "Laptop",
    category: "electronics",
    price: 850,
    stock: 7,
    weight: 2.4,
  },
  {
    id: 102,
    name: "Phone",
    category: "electronics",
    price: 500,
    stock: 15,
    weight: 0.8,
  },
  {
    id: 103,
    name: "Headphones",
    category: "electronics",
    price: 120,
    stock: 20,
    weight: 0.4,
  },
  {
    id: 104,
    name: "Office Chair",
    category: "furniture",
    price: 300,
    stock: 5,
    weight: 12,
  },
];

const customers = [
  {
    id: 1,
    name: "Alice",
    location: "Nairobi",
    loyaltyPoints: 120,
    active: true,
  },
  {
    id: 2,
    name: "Brian",
    location: "Mombasa",
    loyaltyPoints: 40,
    active: true,
  },
  {
    id: 3,
    name: "Carol",
    location: "Nakuru",
    loyaltyPoints: 300,
    active: false,
  },
];

const drivers = [
  {
    id: 201,
    name: "Driver A",
    location: "Nairobi",
    rating: 4.8,
    available: true,
    deliveries: 42,
  },
  {
    id: 202,
    name: "Driver B",
    location: "Mombasa",
    rating: 4.2,
    available: true,
    deliveries: 27,
  },
  {
    id: 203,
    name: "Driver C",
    location: "Nakuru",
    rating: 4.9,
    available: false,
    deliveries: 61,
  },
];

const orders = [
  {
    id: 5001,
    customerId: 1,
    items: [
      { productId: 101, quantity: 1 },
      { productId: 103, quantity: 2 },
    ],
    status: "pending",
  },
  {
    id: 5002,
    customerId: 2,
    items: [{ productId: 102, quantity: 2 }],
    status: "pending",
  },
];

//START OF INVENTORY ENGINE
function findProduct(invento, productId) {
  /*findProduct searches product by id if the product is found return the whole object*/
  return invento.find((product) => product.id === productId) || null;
}

function isProductAvailable(product, quantity) {
  /*check if product quantity is >= quantity and validates*/
  if (!product || typeof product.stock !== "number") return false;
  if (typeof quantity !== "number" || quantity <= 0) return false;

  return product.stock >= quantity;
}

function getProductValue(product, quantity) {
  /*
  this function calculates the subtotal of a product as per the order quantity and price per product
  */
  if (!product || typeof product.price !== "number") return 0;
  if (typeof quantity !== "number" || quantity <= 0) return 0;

  return product.price * quantity;
}

function reduceStock(product, quantity) {
  /*
  this function gets the quantity and and subtracts it from the inhouse stock or quantity
  */
  if (typeof quantity !== "number" || quantity <= 0) return 0;
  if (!product || typeof product.stock !== "number") return 0;
  if (product.stock < quantity) return 0;

  product.stock -= quantity;
  return product.stock;
}

function restockProduct(product, quantity) {
  //adds stock to the inventory
  if (!product || typeof product.stock !== "number") return 0;
  if (typeof quantity !== "number" || quantity <= 0) return 0;

  product.stock += quantity;
  return product.stock;
}

function getInventoryValue(invento) {
  /*this function finds the value of the products and adds it together to give one total value*/
  return invento.reduce((total, item) => {
    return total + (item.stock || 0) * (item.price || 0);
  }, 0);
}
//END OF INVENTORY ENGINE

//START OF CUSTOMER ORDERS HANDLING
function findOrder(orderList, orderId) {
  //finds the order and return it as an object.
  return orderList.find((obj) => obj.id === orderId) || null;
}

function calculateOrderSubtotal(order, invento) {
  //safety check if oder exist and oder.items
  if (!order || !Array.isArray(order.items)) {
    return "invalid order data";
  }

  //calculation and inventory update
  return order.items.reduce((total, item) => {
    const product = findProduct(invento, item.productId);

    if (!isProductAvailable(product, item.quantity)) {
      return total;
    }

    return total + getProductValue(product, item.quantity);
  }, 0);
}

function completeOrder(order, invento) {
  //this function processes the customer orders
  if (!order || !Array.isArray(order.items)) {
    return "invalid data";
  }

  const allAvailable = order.items.every((item) => {
    const product = findProduct(invento, item.productId);

    return isProductAvailable(product, item.quantity);
  });

  if (!allAvailable) {
    return "product not available";
  }

  const subtotal = calculateOrderSubtotal(order, invento);

  //reduce stock from inventory
  order.items.forEach((item) => {
    const product = findProduct(invento, item.productId);
    reduceStock(product, item.quantity);
  });

  order.status = "completed";

  return `order successful! ${subtotal}`;
}

function validateOrder(order) {}
//END OF CUSTOMER ORDERS HANDLING

findProduct(inventory, 101);
isProductAvailable({ id: 101, stock: 15 }, 21);
getProductValue({ id: 102, price: 500 }, 5);
reduceStock({ id: 103, stock: 20 }, 16);
restockProduct({ id: 104, stock: 10 }, 20);
getInventoryValue(inventory);
const selectedOrder = findOrder(orders, 5001);
calculateOrderSubtotal(selectedOrder, inventory);
completeOrder(selectedOrder, inventory);
