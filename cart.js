let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-item');

let basket = JSON.parse(localStorage.getItem('data')) || [];

// !Calculation Function
let calculation = () => {
  let cartIcon = document.getElementById('cart-amount');
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItem = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return `
      <div class="item">
      <img src=${search.img} alt="">
      <div class="cart-details">
          <div class="main">
              <div class="name">
                  <h2>${search.name}</h2>
                  <p>$ ${search.price}</p>
              </div>
              <i onclick="removeItem(${id})" class="bi bi-x-lg cross-icon"></i>
          </div>

          <div class="quantity">
              <i onclick="decrement(${id})" class="bi bi-dash-lg minus"></i>
              <div id="${id}" class="quantityAmount">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg plus"></i>
          </div>

          <h2 class="item-total">$ ${search.price*item}</h2>
      </div>
  </div>`;
      })
      .join(''));
  } else {
    shoppingCart.innerHTML = ``; 
   label.innerHTML = ` <h2 class="empty-title">Cart is empty</h2>
   <a href="index.html">Back to Home</a>`
  }
};

generateCartItem();

// !Increment Function
let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  update(selectedItem.id);
  // totalAmount();
  generateCartItem();
  localStorage.setItem('data', JSON.stringify(basket));
};

// !Decrement Function
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  // totalAmount();
  basket = basket.filter((x) => x.item !== 0);
  generateCartItem();
  localStorage.setItem('data', JSON.stringify(basket));
};


// !Update Function
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id)
  generateCartItem();
  totalAmount();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
}


let totalAmount = () => {
  if(basket.length !== 0) {
    let amount = basket.map((x) => {
      let {id, item} = x;
      let search = shopItemsData.find((y) => y.id === id) || [];

      return search.price*item;
    }).reduce((x,y) => x + y , 0);

    label.innerHTML = 
    `
    <h2 class="label-total">Total: <span>$ ${amount}</span></h2>
    <button  class="checkout" >Checkout</button>
    <button onclick="removeAll()" class="clearAll">Clear Cart</button>
    `
  }else{
    return;
  }
}


let removeAll = () => {
  basket = [];
  generateCartItem();
  localStorage.setItem("data", JSON.stringify(basket));
  calculation();
}
totalAmount();

