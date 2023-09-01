
/* filter by brand */

const productCategory = document.querySelectorAll(".category-item");
const productItems = document.querySelectorAll(".products-item");

productCategory.forEach(function (selectedTab) {
    selectedTab.addEventListener("click", function () {
        const selectedCategory = selectedTab.getAttribute("data-category");
        const selectedItems = Array.from(document.querySelectorAll(`[data-brand=${selectedCategory}]`));

        productCategory.forEach(function (item) {
            item.classList.remove("category-item--active");
        });
        selectedTab.classList.add("category-item--active");

        productItems.forEach(function (item) {
            if (selectedCategory !== item.dataset.brand) {
                item.classList.add("hidden")
            } else {
                item.classList.remove("hidden");
            }
        })
    })
})

/* search filter by brand name on product page */

searchForm.addEventListener("keyup", searchItems);

function searchItems(e) {

    // need to save all items in LocalStorage and do search within it
    const searchedText = e.target.value.toLowerCase();
    productItems.forEach(function (item) {
        const itemText = item.dataset.brand.toLowerCase();
        // Проверяем вхождение искомой подстроки в текст задачи
        if (itemText.indexOf(searchedText) != -1) {
            // Если вхождение есть - показываем элемент с задачей
            item.classList.remove("hidden");

        } else {
            // Если вхождения нет - скрываем элемент с задачей
            item.classList.add("hidden");
        }
    })
}

/* page products left/right btns */


const productRowAll = document.querySelectorAll(".products-row");
const hotProductsRow = document.querySelector(".slider-product-row");
const productItemsLinks = document.querySelectorAll(".product-item-link");

const productItem = document.querySelector(".products-item");
const btnLeft = document.querySelector(".arrow-link--prev");
const btnRight = document.querySelector(".arrow-link--next");

hotProductsRow.setAttribute('data-target', 'product-row');

productItems.forEach(function (item) {
    item.dataset.product = "item";
})


const productRowWidth = hotProductsRow.offsetWidth;
const itemStyle = productItem.currentStyle || window.getComputedStyle(productItem);
const itemMarginRight = Number(itemStyle.marginRight.match(/\d+/g)[0]);
const itemWidth = Number(itemStyle.width.match(/\d+/g)[0]);

const itemCount = hotProductsRow.querySelectorAll("[data-product=item]").length;
const itemWidthT = hotProductsRow.querySelector("[data-product=item]").offsetWidth;


let offset = 0;

const check = Math.round(productRowWidth / (itemWidthT + itemMarginRight)); // how many items in a row

const maxX = -((itemCount / check) * productRowWidth + (itemMarginRight * (itemCount / check)) - productRowWidth - itemMarginRight);

btnLeft.addEventListener("click", function () {
    if (offset !== 0) {
        console.log("left")
        offset += productRowWidth + itemMarginRight;
        hotProductsRow.style.transform = `translateX(${offset}px)`;
    }
});

btnRight.addEventListener("click", function () {
    console.log("right")
    if (offset >= maxX) {
        offset -= productRowWidth + itemMarginRight;
        hotProductsRow.style.transform = `translateX(${offset}px)`;
    }
})

/* set links on items */

productRowAll.forEach(function (item) {

    for (i = 0; i < productItemsLinks.length; i++) {
        productItemsLinks[i].setAttribute(
            "href",
            `./item${i}.html`);
    };
});

/* hover on items */

let productHoverList, requestBtnAll, addToCartBtnAll;

productItems.forEach(function (item) {
    let productHover = item.appendChild(document.createElement("div"));
    productHover.classList.add("product-item-hover");
    productHoverList = document.querySelectorAll(".product-item-hover")

    const selectedItem = item.querySelector(".product-price").innerText;

    /* additing HTML code for hover */

    if (selectedItem === "unlisted") {

        productHover.innerHTML = `
                <a href="#" class="product-item--add" data-item="request-item">
                <img src="./img/products/icons/request-icon.svg" alt="request">
                request a quote
            </a>
            <p class="product-item-storage">Storage: <span>29</span></p>
                `;
    } else {
        productHover.innerHTML = `
                <a href="#" class="product-item--add" data-item="add-item">
                    <img src="./img/products/icons/add-icon.svg" alt="add">
                    Add to cart
                </a>
                <p class="product-item-storage">Storage: <span>359</span></p>
                `;
    }

    /* creating cart and request btn outside the loop */

    addToCartBtnAll = document.querySelectorAll('[data-item="add-item"]');
    requestBtnAll = document.querySelectorAll('[data-item="request-item"]')
    /* mouse action */

    item.addEventListener("mouseenter", function () {
        productHover.style.display = "inline-block";
    })
    item.addEventListener("mouseleave", function () {
        productHover.style.display = "none";
    })
})


/* collecting items info */

productRowAll.forEach(function (item) {

    for (i = 0; i < productItems.length; i++) {
        productItems[i].setAttribute(
            "data-number",
            `${i}`);
    };
});

productRowAll.forEach(function (item) {
    for (i = 0; i < productItems.length; i++) {
        productItems[i].setAttribute("data-quantity", 0)
    };
});

/* getting quantity/clicks from local storage and display in cart in the header */

/* add and request change number in the header by click and storage in localStorage */

//const quoteNumber = document.querySelector(".quote-number"); - decleared at main.js
//const cartNumber = document.querySelector(".cart-number"); - decleared at main.js

let itemStartAdd, addedItemsNewQ, addedItemsNewQJSON, itemStartRequest, requestItemsQ, requestItemsQJSON;

cartNumber.innerText = parseInt(JSON.parse(localStorage.getItem("addedItemCartNumber"))) || "";
quoteNumber.innerText = parseInt(JSON.parse(localStorage.getItem("requestItemNumber"))) || "";

itemStartAdd = parseInt(JSON.parse(localStorage.getItem("addedItemCartNumber"))) || 0;


addToCartBtnAll.forEach(function (item) {
    item.addEventListener("click", function (e) {
        e.preventDefault();
        this.closest(".products-item").setAttribute("data-cart", "added");

        addedItemsNewQ = itemStartAdd || 0;
        addedItemsNewQ = ++itemStartAdd;
        //cartNumber.innerText = addedItemsNewQ;

        addedItemsNewQJSON = JSON.stringify(addedItemsNewQ)
        localStorage.setItem("addedItemCartNumber", addedItemsNewQJSON);
        cartNumber.innerText = parseInt(JSON.parse(localStorage.getItem("addedItemCartNumber")));
    })
})

itemStartRequest = parseInt(quoteNumber.innerText) || 0;

requestBtnAll.forEach(function (item) {
    item.addEventListener("click", function (e) {
        e.preventDefault();

        this.closest(".products-item").setAttribute("data-cart", "requested");

        requestItemsQ = itemStartRequest || 0;
        requestItemsQ = ++itemStartRequest;
        //quoteNumber.innerText = requestItemsQ;

        requestItemsQJSON = JSON.stringify(requestItemsQ);
        localStorage.setItem("requestItemNumber", requestItemsQJSON);
        quoteNumber.innerText = parseInt(JSON.parse(localStorage.getItem("requestItemNumber")));
    })
})

/* Additing items to localStorage */

const productsColumn = document.querySelector(".products-column");

productsColumn.addEventListener("click", addItemLocalStorage);

let brandName, itemTitle, itemPrice, itemImg, addedItemInfo, itemNumber, itemQuantity, itemQuantityCount;


let dataAddedItemFromLocalStorage = JSON.parse(localStorage.getItem("addedItemtoStorage"));
let addedDataItem = dataAddedItemFromLocalStorage || [];

dataRequestedItemFromLocalStorage = JSON.parse(localStorage.getItem("requestedItemtoStorage"));
let dataRequestedItem = dataRequestedItemFromLocalStorage || [];



function addItemLocalStorage(e) {
    e.preventDefault();
    if (e.target.closest(".products-item")) {
        const chosenItem = e.target.closest(".products-item");
        brandName = chosenItem.dataset.brand;
        itemTitle = chosenItem.querySelector(".product-title").innerText;
        itemPrice = parseInt(chosenItem.querySelector(".product-price").innerText.replace(/,/g, ""));
        itemImg = chosenItem.querySelector(".product-img").getAttribute("src");
        itemCartValue = chosenItem.dataset.cart;
        itemNumber = parseInt(chosenItem.dataset.number);
        itemQuantity = parseInt(chosenItem.dataset.quantity);
        itemLink = chosenItem.querySelector(".product-item-link").getAttribute("href");

        addedItemInfo = {
            brandName: brandName,
            itemTitle: itemTitle,
            itemPrice: itemPrice,
            itemImg: itemImg,
            itemCartValue: itemCartValue,
            itemNumber: itemNumber,
            itemQuantityCount: itemQuantity,
            itemLink: itemLink
        }

        if (itemCartValue == "added") {
            addedDataItem.push(addedItemInfo);
        } else {
            dataRequestedItem.push(addedItemInfo)

        }

        /* ADDED ITEM TO LOCAL STORAGE */

        /* if the item already added to local storage then need to add 'data-quantity' with meaning +1 */

        for (i = 0; i < addedDataItem.length; i++) {

            if (addedDataItem[i].itemNumber === addedItemInfo.itemNumber) {
                addedDataItem[i].itemQuantityCount++;

                if (addedDataItem[i].itemQuantityCount > addedItemInfo.itemQuantityCount) {
                    addedDataItem.pop(addedItemInfo)
                }
            }
        }

        for (i = 0; i < addedDataItem.length; i++) {
            if (addedDataItem[i].itemNumber === addedItemInfo.itemNumber) {
                addedDataItem[i].itemPrice = addedItemInfo.itemPrice;
            }
            if (addedDataItem[i].itemPrice === addedItemInfo.itemPrice && addedDataItem[i].itemQuantityCount > addedItemInfo.itemQuantityCount) {
                addedDataItem[i].itemPrice = addedDataItem[i].itemPrice * addedDataItem[i].itemQuantityCount;
            }
        }

        addedDataItemJSON = JSON.stringify(addedDataItem)

        localStorage.setItem("addedItemtoStorage", addedDataItemJSON);

        dataAddedItemFromLocalStorage = JSON.parse(localStorage.getItem("addedItemtoStorage"));

        /* REQUESTED ITEM TO LOCAL STORAGE */
        /* if the item already added to local storage then need to add 'data-quantity' with meaning +1 */

        for (i = 0; i < dataRequestedItem.length; i++) {

            if (dataRequestedItem[i].itemNumber === addedItemInfo.itemNumber) {
                dataRequestedItem[i].itemQuantityCount++;

                if (dataRequestedItem[i].itemQuantityCount > addedItemInfo.itemQuantityCount) {
                    dataRequestedItem.pop(addedItemInfo)
                }
            }
        }

        for (i = 0; i < dataRequestedItem.length; i++) {
            if (dataRequestedItem[i].itemNumber === addedItemInfo.itemNumber) {
                dataRequestedItem[i].itemPrice = addedItemInfo.itemPrice;
            }
            if (dataRequestedItem[i].itemPrice === addedItemInfo.itemPrice && dataRequestedItem[i].itemQuantityCount > addedItemInfo.itemQuantityCount) {
                // console.log(data.splice(i, 1))
                dataRequestedItem[i].itemPrice = dataRequestedItem[i].itemPrice * dataRequestedItem[i].itemQuantityCount;
                //data.pop(addedItemInfo)
            }
        }

        dataRequestedItemJSON = JSON.stringify(dataRequestedItem)
        localStorage.setItem("requestedItemtoStorage", dataRequestedItemJSON);
        dataRequestedItemFromLocalStorage = JSON.parse(localStorage.getItem("requestedItemtoStorage"));
    }


};