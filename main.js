const selectElement = (selector) => {
    const element = document.querySelector(selector)
    if (element) return element;
    throw new Error {
        `${selector} does not exist`
    }
}


let shop = [];

const 