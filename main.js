const shop = document.getElementById("shop");


let basket = [];

// !Data
let shopItemsData = [
    {
        id:"1",
        name: "Casual Shirts",
        price: 45,
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing.",
        img: "img/img-1.jpg"
    },
    {
        id:"2",
        name: "Office Shirts",
        price: 100,
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing.",
        img: "img/img-2.jpg"
    },
    {
        id:"3",
        name: "T Shirts",
        price: 25,
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing.",
        img: "img/img-3.jpg"
    },
    {
        id:"4",
        name: "Men Suits",
        price: 300,
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing.",
        img: "img/img-4.jpg"
    },
    ];

    let generateShop = () => { 
        return (shop.innerHTML = shopItemsData.map((x) => {
            let {id, name, price, desc, img } = x;
            return `
            <div id="product-${id}" class="shop-item">
                <img src=${img} alt="">
                <div class="details">
                    <h2>${name}</h2>
                    <p class="description">${desc}</p>
                    <div class="price">
                        <h2>$ ${price}</h2>
                        <div class="quantity">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg minus"></i>
                            <div id="${id}" class="quantityAmount">0</div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg plus"></i>
                        </div>
                    </div>
                </div>
            </div>
            `
        }).join(""))
    }


generateShop();

function increment(id) {
    selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem)
    
    if(search === undefined) {
        basket.push( {
            id: selectedItem,
            item: 1
        });
    }
    else {
        search.item += 1;
    }       
    update(selectedItem);
}

function decrement(id) {
    selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem)
    
    if(search.item === 0) {
        return
    }
    else {
        search.item -= 1;
    }
    update(selectedItem);
}
 

function update(id) {
let search = basket.find((x) => x.id === id)
let result  = document.getElementById(id)
result.innerHTML = search.item; 
calculation();
}

let calculation = () => {
    let cartAmount = document.getElementById("cart-amount");
    let total = basket.map((x) => x.item).reduce((x,y) => x+y, 0)
    cartAmount.innerHTML = total;
}