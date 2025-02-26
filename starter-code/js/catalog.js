/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
const cart = new Cart([]);
/// ----------------------------- cart is and instance of a CART -------------------////
/// ------------------- use cmd/ctl f to look for words in your code ------------------///

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {
  //TODO: Add an <option> tag inside the form's select for each product
  const selectElement = document.getElementById('items');
  for (let product of Product.allProducts) {
    //make options with product.name
    const optionElem = document.createElement('option');
    optionElem.setAttribute('value', product.name);
    optionElem.textContent = product.name;
    selectElement.appendChild(optionElem);
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  event.preventDefault();
  // TODO: Prevent the page from reloading
  /// --------------- at this point you know which item was picked from the list, how many ----------- ///
  // Do all the things ...
  console.log('starting handler');
  addSelectedItemToCart(event);
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart(event) {
  // TODO: suss out the item picked from the select list
  // TODO: get the quantity
  // TODO: using those, add one item to the Cart
  const product = event.target.items.value;
  const quantity = event.target.quantity.value;
  cart.addItem(product, quantity);
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  const itemCount = document.getElementById('itemCount');
  itemCount.textContent = ` ${cart.items.length}`;
}
// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO: Get the item and quantity from the form
  // TODO: Add a new element to the cartContents div with that information
  const cartItem = cart.items[cart.items.length - 1];
  console.log('.....', cartItem);
  const cartContent = document.getElementById('cartContents');
  const cartItemDiv = document.createElement('div');
  cartItemDiv.textContent = `${cartItem.product}: ${cartItem.quantity}`;
  cartContent.appendChild(cartItemDiv);
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
