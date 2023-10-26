$(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
        $('#myNavbar').removeClass('bg-transparent navbar-dark p-3');
        $('.myIcon').removeClass('myIconColor');
        $('#myNavbar').addClass('bg-light navbar-light p-2');
        $('#myNavbar ul li a').addClass('scrolled');
    } else {
        $('#myNavbar').removeClass('bg-light navbar-light p-2');
        $('#myNavbar').addClass('bg-transparent navbar-dark p-3');
        $('.myIcon').addClass('myIconColor');
        $('#myNavbar ul li a').removeClass('scrolled');
    }
});

/* Cart */
const cartButton = document.getElementById('cartButton');
const closeCartButton = document.getElementById('closeCart');
const cart = document.getElementById('cart');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.getElementById('cartTotal');

let cartIsOpen = false;
const cartItemsData = [];

// Function to add an item to the cart
function addItemToCart(productName, price) {
  const item = {
    name: productName,
    price: price,
    quantity: 1,
  };

  cartItemsData.push(item);
  updateCart();
}

// Function to update the cart's visual representation
function updateCart() {
  cartItems.innerHTML = '';

  let total = 0;

  cartItemsData.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <span>${item.name} x${item.quantity}</span>
      <div>
        <button class="increase-quantity">+</button>
        <button class="decrease-quantity">-</button>
        <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    `;

    const increaseButton = cartItem.querySelector('.increase-quantity');
    increaseButton.addEventListener('click', () => {
      cartItemsData[index].quantity++;
      updateCart();
    });

    const decreaseButton = cartItem.querySelector('.decrease-quantity');
    decreaseButton.addEventListener('click', () => {
      if (cartItemsData[index].quantity > 1) {
        cartItemsData[index].quantity--;
      } else {
        cartItemsData.splice(index, 1);
      }
      updateCart();
    });

    cartItems.appendChild(cartItem);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = total.toFixed(2);
}

cartButton.addEventListener('click', () => {
  cartIsOpen = !cartIsOpen;
  if (cartIsOpen) {
    cart.style.right = '0';
  } else {
    cart.style.right = '-300px';
  }
});

closeCartButton.addEventListener('click', () => {
  cartIsOpen = false;
  cart.style.right = '-300px';
});

// Example usage:
addItemToCart('Product 1', 25.00);
addItemToCart('Product 2', 15.00);
