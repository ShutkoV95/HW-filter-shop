const doc = document;
const productsEl = doc.querySelector('.products');
const cartEl = doc.querySelector('.cart');
const cartCountEl = doc.querySelector('.cart__count');
const cartProdList = {
    length: 0,
};
let cartCount = cartProdList.length;
// --------------------------------------

cartCountEl.innerText = cartCount != 0 ? `(${cartCount})` : ' EMPTY';
cartEl.onclick = showCart;




//----------test
const filterbrands = doc.forms.brands;
const filterItems = filterbrands.elements;
const filterArr = [];
for (let filterItem of filterItems) {
    filterItem.oninput = function() {
        const id = this.dataset.id;
        const index = filterArr.indexOf(id);
        if (this.checked) {
            if (index == -1) {
                filterArr.push(id);
            } 
        } else {
            filterArr.splice(index, 1)
        }
        console.log(filterArr);
        renderProducts(productsEl, products);
    }
};

doc.querySelector('.reset').onclick = function () {
    filterArr.length = 0;
    console.log(filterArr);
    renderProducts(productsEl, products);
//    startRenderProducts(productsEl, products);
}

startRenderProducts(productsEl, products);

// FUNCTIONS -----------------------------
function startRenderProducts(parent, productList) {
    for (let product of productList) {
        renderProduct(parent, product);
    }
}

function renderProducts(parent, productList) {
    parent.innerHTML = '';
    for (let product of productList) {
        console.log(product);
        if (filterArr.includes(product.brand + '')) {
            renderProduct(parent, product);
        } 
    }
}

function renderProduct(parent, prodObj) {
    const product = doc.createElement('div');

    const brandProduct = doc.createElement('div');
    const brandName = doc.createElement('h3');

    const productImgBlock = doc.createElement('div');
    const productImg = doc.createElement('img');

    const productTitle = doc.createElement('h3');

    const productPriceBlock = doc.createElement('div');
    const productPrice = doc.createElement('span');
    const addCartBtn = doc.createElement('button');

    product.className = 'product';
    product.dataset.id = prodObj.id;

    brandProduct.className = 'product__brand-block';
    brandName.className = 'brand__name';
    brandName.innerText = getCategory('brands', prodObj.brand);
    brandProduct.append(brandName);

    productImgBlock.className = 'product__img';
    productImg.setAttribute('src', `${IMG_PATH}/${prodObj.img}`);
    productImgBlock.append(productImg);

    productTitle.className = 'product__title';
    productTitle.innerText = prodObj.title;

    productPriceBlock.className = 'product__price-block';
    productPrice.className = 'product__price';
    productPrice.innerText = prodObj.price;
    addCartBtn.className = 'add-cart';
    addCartBtn.innerText = 'add to cart';
    addCartBtn.onclick = addProdToCart;
    productPriceBlock.append(productPrice, addCartBtn);

    product.append(
        brandProduct,
        productImgBlock,
        productTitle,
        productPriceBlock
    );

    parent.append(product);
}

function getCategory(catType, catId) {
    let srcData = [];
    let obj= {};

    switch (catType) {
        case 'brands':
            srcData = brands;
        break;
    }

    obj = srcData.find(function(item){
        return item.id == catId;
    });

    return obj.name;
}

function addProdToCart(e) {
    const id = e.target.closest('.product').dataset.id;

    !cartProdList[id] ? cartProdList[id] = 1 : cartProdList[id] ++;

    cartProdList.length ++;
    cartCount = cartProdList.length;
    cartCountEl.innerText = `(${cartCount})`;
}

function showCart() {
    const cartPopup = doc.createElement('div');
    const cartPopupContentBlock = doc.createElement('div');
    const cartPopupContent = doc.createElement('div');

    cartPopup.className = 'cart-popup';

    cartPopupContentBlock.className = 'cart-popup__content-block';
    cartPopupContent.className = 'cart-popup__content';
    cartPopupContent.innerHTML = `
        <div class="cart-prod-list-header">
            <span class="cart-prod-list-header__item cart-item-number">№</span>
            <span class="cart-prod-list-header__item cart-item-title">Title</span>
            <span class="cart-prod-list-header__item cart-item-count">Count</span>
            <span class="cart-prod-list-header__item cart-item-price">Price</span>
            <span class="cart-prod-list-header__item cart-item-total">Total</span>
        </div>
    `;

    cartPopupContentBlock.append(cartPopupContent);
    renderCloseBtn(cartPopupContentBlock, '.cart-popup');
    cartPopup.append(cartPopupContentBlock);

    renderCartProductList(cartProdList, cartPopupContent)

    doc.body.append(cartPopup);

    console.log(cartProdList);
}

function renderCartProductList(prodList, parent) {
    const cartProdListEl = doc.createElement('ul');
    let cartProdEl = '';
    let number = 1;

    for (let key in prodList) {
        if (key == 'length') {
            continue;
        }

        const prodCount = prodList[key];
        const prod = products.find(function(item) {
            return item.id == key;
        });
        const prodTotal = prodCount * prod.price;
        cartProdEl += `
            <li class="cart-prod">
                <span class="cart-prod__item cart-item-number">${number}</span>
                <div class="cart-prod__info">
                    <span class="cart-prod__item cart-item-title">${prod.title}</span>
                    <span class="cart-prod__item cart-item-count">${prodCount}</span>
                    <span class="cart-prod__item cart-item-price">${prod.price}</span>
                    <span class="cart-prod__item cart-item-total">${prodTotal}</span>
                </div>
            </li>
        `;

        cartProdListEl.className = 'cart-prod-list';
        cartProdListEl.innerHTML = cartProdEl;

        parent.append(cartProdListEl);

        number ++;
    }
}


function closeCart() {}

function renderCloseBtn(parent, closeParentSelector) {
    const closeBtn = doc.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '&#x2715';
    parent.append(closeBtn);
    closeBtn.onclick = function() {
        const closeEl = this.closest(closeParentSelector);
        closeEl.remove();
    }
}





/*
cartProdEls = {
    1: 5,
    2: 3,
    3: 8,
    count: 16
};

*/