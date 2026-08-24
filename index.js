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

/*findProduct searches product by id if the product is found return the whole object*/
function findProduct(productId) {
  const found = inventory.find((product) => product.id === productId);

  return found;
}

function isProductAvailable(productId, quantity) {
  /*should check if product exists by id then check if stock is valid to validate*/

  const found = inventory.find((product) => product.id === productId);

  if (!found) {
    return false;
  }

  return found.stock >= quantity;
}

findProduct(102);
isProductAvailable(103, 21);
inventory;
customers;
drivers;
orders;
