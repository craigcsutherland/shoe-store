// Define global variables
let cartItems = [];
const cart = document.querySelector(".cart");
const cartList = cart.querySelector("ul");
const cartTotal = cart.querySelector("p");
const cartCheckout = cart.querySelector("button");

// Function to update the cart total
function updateCartTotal() {
  let total = 0;
  cartItems.forEach((item) => {
    total += item.price;
  });
  cartTotal.textContent = `Total: £${total.toFixed(2)}`;
}

// Function to add an item to the cart
function addToCart(item) {
  // Check if item is already in the cart
  const index = cartItems.findIndex(
    (i) => i.id === item.id && i.size === item.size
  );
  if (index !== -1) {
    // Item is already in the cart, increase quantity and update total cost
    cartItems[index].quantity += 1;
    cartItems[index].total = cartItems[index].price * cartItems[index].quantity;
  } else {
    // Item is not in the cart, add it and calculate total cost
    item.total = item.price;
    cartItems.push(item);
  }

  // Update the cart list
  cartList.innerHTML = "";
  cartItems.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} (${item.size}) - £${item.total.toFixed(2)}`;
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.dataset.id = item.id;
    removeButton.dataset.size = item.size;
    li.appendChild(removeButton);
    cartList.appendChild(li);
    removeButton.addEventListener("click", function () {
      removeFromCart(item.id, item.size);
    });
  });

  // Update the cart total and show the cart
  let total = 0;
  cartItems.forEach((item) => {
    total += item.total;
  });
  cartTotal.textContent = `Total: £${total.toFixed(2)}`;
  cart.style.display = "block";
}
// Function to remove an item from the cart
function removeFromCart(id, size) {
  // Find the item in the cart
  const index = cartItems.findIndex(
    (item) => item.id === id && item.size === size
  );
  if (index !== -1) {
    // Remove the item from the cart
    cartItems.splice(index, 1);
    // Update the cart list and total
    updateCartTotal();
    cartList.innerHTML = "";
    cartItems.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} (${item.size}) - $${(
        item.price * item.quantity
      ).toFixed(2)}`;
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.dataset.id = item.id;
      removeButton.dataset.size = item.size;
      li.appendChild(removeButton);
      cartList.appendChild(li);
      removeButton.addEventListener("click", function () {
        removeFromCart(item.id, item.size);
      });
    });
    // Hide the cart if it's empty
    if (cartItems.length === 0) {
      cart.style.display = "none";
    }
  }
}
// Function to handle checkout
function handleCheckout() {
  // Replace with your own checkout code
  alert("Checkout functionality coming soon!");
}

// Add event listener for "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll(".product button");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    // Get the product information
    const product = e.target.parentNode;
    const name = product.querySelector("h3").textContent;
    const price = parseFloat(product.querySelector("p").textContent.slice(1));
    const size = product.querySelector("select").value;
    const id = product.dataset.id;

    // Add the product to the cart
    addToCart({ id, name, price, size, quantity: 1 });
  });
});

// Add event listener for "Remove" buttons in the cart
cartList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = e.target.dataset.id;
    removeFromCart(id);
  }
});

// Add event listener for checkout button in the cart
cartCheckout.addEventListener("click", handleCheckout);
