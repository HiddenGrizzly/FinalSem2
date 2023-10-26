$(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
        $('#myNavbar').removeClass('pt-3 pb-3');
        $('#myNavbar').addClass('pt-2 pb-2');
    } else {
        $('#myNavbar').removeClass('pt-2 pb-2');
        $('#myNavbar').addClass('pt-3 pb-3');
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector("#search");
    const searchModal = document.querySelector("#mySearchModal .modal-body");

    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value;

        // Make an AJAX request to your backend API
        // Replace 'your_api_endpoint' with the actual endpoint
        fetch(`your_api_endpoint?search=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                // Clear previous results
                searchModal.innerHTML = "";

                if (data.length > 0) {
                    data.forEach(product => {
                        // Create an element to display the product information
                        const productElement = document.createElement("div");
                        productElement.textContent = product.name;
                        searchModal.appendChild(productElement);
                    });
                } else {
                    // Display a message if no matching products are found
                    searchModal.textContent = "No matching products found.";
                }
            })
            .catch(error => {
                console.error("Error fetching data: " + error);
            });
    });
});

/*Cart*/
// Sample data structure for cart items
const cartItems = [
    {
        id: 1,
        name: "Product 1",
        imageSrc: "/image/product1.webp",
        quantity: 1,
        price: 20.00
    },
    {
        id: 2,
        name: "Product 2",
        imageSrc: "/image/product2.webp",
        quantity: 2,
        price: 15.00
    }
    // Add more items as needed
];

// Function to display cart items in the modal
function displayCartItems() {
    const displayProducts = document.getElementById('displayProducts');

    // Clear the previous content
    displayProducts.innerHTML = '';

    // Loop through the cart items and create elements for each
    cartItems.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('cart-item');

        // Create elements for product image, name, quantity, price, and buttons
        // Adjust the layout and styling as needed
        productDiv.innerHTML = `
            <div class="product-detail">
                <img src="${item.imageSrc}" alt="${item.name}" class="product-image">
                <div class="product-info">
                    <p>${item.name}</p>
                    <p>Price: $${item.price}</p>
                    <div class="quantity-control">
                        <button class="decrease-quantity">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increase-quantity">+</button>
                    </div>
                </div>
            </div>
        `;
        const increaseButton = productDiv.querySelector('.increase-quantity');
        const decreaseButton = productDiv.querySelector('.decrease-quantity');
        const quantitySpan = productDiv.querySelector('.quantity');

        increaseButton.addEventListener('click', () => {
            item.quantity += 1;
            quantitySpan.textContent = item.quantity;
        });

        decreaseButton.addEventListener('click', () => {
            if (item.quantity > 1) {
                item.quantity -= 1;
                quantitySpan.textContent = item.quantity;
            }
        });
        // Append the product to the displayProducts div
        displayProducts.appendChild(productDiv);
    });
}

// Call the function to display cart items when the modal is shown
$('#myCartModal').on('show.bs.modal', function () {
    displayCartItems();
});
