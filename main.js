const links = document.querySelectorAll("a");
links.forEach(function (item) {
    item.setAttribute(
        "target",
        "_blank");
});


/* search within website input */

/* the look of search btn */

const searchForm = document.querySelector(".search");
const searchBtn = document.querySelector(".search__button");

searchBtn.addEventListener("click", openSearchInput);

function openSearchInput(e) {
    e.preventDefault();
    if (!searchForm.classList.contains("search--visible")) {
        searchForm.classList.add("search--visible");
    } else {
        searchForm.classList.remove("search--visible");

    }
};


/* mobile menu */

const mobileNavBtn = document.querySelector('.mobile-nav-icon');
const mobileNav = document.querySelector('.mobile-nav');

mobileNavBtn.addEventListener("click", openMenu);

function openMenu() {
    mobileNav.classList.toggle("mobile-nav--active");
    mobileNavBtn.classList.toggle("mobile-nav-icon-close");
}

/* pop up menu */

const categoryBtn = document.querySelector(".category");
const popUpMenu = document.querySelector(".category-popup-menu");

categoryBtn.addEventListener("click", openCategoryMenu);

function openCategoryMenu(e) {
    e.preventDefault();
    popUpMenu.classList.toggle("category-popup-menu--active");
}

/* language */

const langBtn = document.querySelector(".language");
const dropDownMenu = document.querySelector(".drop-down-menu-list");
const langItems = document.querySelectorAll(".lang-item");
const currentLang = document.querySelector(".current-lang");


langBtn.addEventListener("click", chooseLangBtn);

function chooseLangBtn() {
    dropDownMenu.classList.toggle("drop-down-menu-list--active");
    for (i = 0; i < langItems.length; i++) {
        langItems[i].addEventListener("click", function () {
            currentLang.innerHTML = this.innerHTML;
        });
    };
};

/* email validation */

const email = document.querySelector("#email");
const subscribeBtn = document.querySelector(".subscribe_btn");

function validateEmail(email) {
    const emailLowCase = email.toLowerCase();
    const pattern = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    return pattern.test(emailLowCase);
}

subscribeBtn.addEventListener("click", submit);

function submit(e) {
    e.preventDefault();
    if (validateEmail(email.value)) {
        console.log("valid email");
    } else {
        console.log(" not valid email");
    }
}

/* upload number in cart and qoute from localStorage */

const cartNumber = document.querySelector(".cart-number");
let cartNumberAmount = parseInt(JSON.parse(localStorage.getItem("addedItemCartNumber"))) || 0;
cartNumber.innerText = cartNumberAmount || "";

const quoteNumber = document.querySelector(".quote-number");
let quoteNumberAmount = parseInt(JSON.parse(localStorage.getItem("requestItemNumber"))) || 0;
quoteNumber.innerText = quoteNumberAmount || "";




