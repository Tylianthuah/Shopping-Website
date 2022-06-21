let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-item");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cart-amount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  };
  
  calculation();

  let generateCartItem = () => {
    if(basket.length !== 0){
        console.log("basket is not empty");
    }
    else{
    label.style.display = "block";
    }
  }

  generateCartItem();