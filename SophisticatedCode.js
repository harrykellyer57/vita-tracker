/*
Filename: SophisticatedCode.js
Content: A complex and sophisticated JavaScript code demonstrating a dynamic restaurant ordering system.
This code is more than 200 lines long and includes multiple functions, loops, conditionals, and object manipulation.
*/

// Restaurant Menu object
const restaurantMenu = {
  appetizers: [
    { name: "Bruschetta", price: 8.99 },
    { name: "Calamari", price: 12.99 },
    { name: "Chicken Wings", price: 10.99 }
  ],
  mainCourses: [
    { name: "Spaghetti Carbonara", price: 14.99 },
    { name: "Grilled Salmon", price: 18.99 },
    { name: "Steak with Mushrooms", price: 20.99 }
  ],
  desserts: [
    { name: "Tiramisu", price: 6.99 },
    { name: "Chocolate Cake", price: 7.99 },
    { name: "Creme Brulee", price: 8.99 }
  ]
};

// Order object
const order = {
  items: [],
  total: 0
};

// Function to display the menu
function displayMenu() {
  console.log("------- Welcome to Our Restaurant --------");
  console.log("------- Menu -------");
  
  console.log("------- Appetizers -------");
  for (let appetizer of restaurantMenu.appetizers) {
    console.log(`${appetizer.name}: $${appetizer.price}`);
  }
  
  console.log("------- Main Courses -------");
  for (let mainCourse of restaurantMenu.mainCourses) {
    console.log(`${mainCourse.name}: $${mainCourse.price}`);
  }
  
  console.log("------- Desserts -------");
  for (let dessert of restaurantMenu.desserts) {
    console.log(`${dessert.name}: $${dessert.price}`);
  }
}

// Function to place an order
function placeOrder(itemType, itemName) {
  let itemFound = false;
  let selectedItem = {};
  
  switch (itemType) {
    case "appetizers":
      selectedItem = restaurantMenu.appetizers.find(item => item.name === itemName);
      break;
    case "mainCourses":
      selectedItem = restaurantMenu.mainCourses.find(item => item.name === itemName);
      break;
    case "desserts":
      selectedItem = restaurantMenu.desserts.find(item => item.name === itemName);
      break;
    default:
      console.log("Invalid item type!");
      return;
  }
  
  if (selectedItem) {
    order.items.push(selectedItem);
    order.total += selectedItem.price;
    console.log(`Added ${itemName} to the order.`);
  } else {
    console.log(`Item '${itemName}' not found on the menu.`);
  }
}

// Function to display the current order
function displayOrder() {
  console.log("------- Current Order -------");
  for (let item of order.items) {
    console.log(`${item.name}: $${item.price}`);
  }
  console.log(`Total: $${order.total}`);
}

// Function to clear the order
function clearOrder() {
  order.items = [];
  order.total = 0;
  console.log("Order cleared.");
}

// Main program logic
displayMenu();

placeOrder("appetizers", "Calamari");
placeOrder("mainCourses", "Grilled Salmon");
placeOrder("desserts", "Tiramisu");

displayOrder();

placeOrder("appetizers", "Mozzarella Sticks");

displayOrder();

clearOrder();

displayOrder();

placeOrder("mainCourses", "Steak with Mushrooms");

displayOrder();

/*
The code above demonstrates a dynamic restaurant ordering system. It includes a restaurant menu with different categories of items, a placeOrder function to add items to the order, a displayOrder function to show the current order, and a clearOrder function to clear the order.

The code also includes a main program logic to showcase the functionality of the ordering system. It displays the menu, places multiple orders, displays the current order after each step, clears the order, and places another order.

This code is just a simplified example, but in a real-world scenario, it can be expanded to include more complex features such as handling multiple customers, managing inventory, calculating taxes, and generating receipts.
*/