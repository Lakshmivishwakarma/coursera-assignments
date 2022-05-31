
const categoryString = `<div class="col-md-3 col-sm-4 col-xs-6 col-xxs-12">
<a href="#" onclick="loadMenuItems('{{short_name}}');">
  <div class="category-tile">
    <img width="200" height="200" src="images/menu/{{short_name}}/{{short_name}}.jpg" alt="{{name}}">
    <span>{{name}}</span>
  </div>
</a>
</div>`;

const menuItemString = `<div class="menu-item-tile col-md-6">
<div class="row">
  <div class="col-sm-5">
    <div class="menu-item-photo">
      <div>{{short_name}}</div>
      <img class="img-responsive" width="250" height="150" src="images/menu/{{catShortName}}/{{short_name}}.jpg" alt="Item">
    </div>
    <div class="menu-item-price">{{price_small}}<span> {{small_portion_name}}</span> {{price_large}} <span>{{large_portion_name}}</span></div>
  </div>
  <div class="menu-item-description col-sm-7">
    <h3 class="menu-item-title">{{name}}</h3>
    <p class="menu-item-details">{{description}}</p>
  </div>
</div>
<hr class="visible-xs">
</div>`;

// for nav bar 
$(function () { // Same as document.addEventListener("DOMContentLoaded"...

  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $(".navbar-toggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });

  // In Firefox and Safari, the click event doesn't retain the focus
  // on the clicked button. Therefore, the blur event will not fire on
  // user clicking somewhere else in the page and the blur event handler
  // which is set up above will not be called.
  // Refer to issue #28 in the repo.
  // Solution: force focus on the element that the click event fired on
  $(".navbar-toggle").click(function (event) {
    $(event.target).focus();
    // OR
    $(".navbar-toggle").focus();
    // OR
    $(this).focus();

  });
  loadHomeContents();
});

function insertProperty(us, property, value) {
  let str;
  str = us.replace(new RegExp(property, 'g'), value);
  return str
}

function ajaxGet(url, repsoneHandler) {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (req.readyState === 4 && req.status === 200) {
      repsoneHandler(req.response);

    }
  }
  req.open("GET", url, true);
  req.send();
}
// Remove the class active from home

let switchActive = function () {

  let classes = document.querySelector("#navHomeButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navHomeButton").className = classes;

  classes = document.querySelector("#navMenuButton").className;
  if (classes.indexOf("active") == -1) {
    classes += "active";
    document.querySelector("#navMenuButton").className = classes;
  }
};

// for index.html
function loadHomeContents() {
  ajaxGet("snippets/home_snippets.html", function (response) {
    document.getElementById("main-content").innerHTML = response;
  });
}

function loadMenuCategoriesTitle() {
  ajaxGet("snippets/categories-title-snippet.html", function (response) {
    document.getElementById("main-content").innerHTML = response;
  });
}

function showMenuCategory() {

  ajaxGet("https://davids-restaurant.herokuapp.com/categories.json", function (response) {

    let menuListHTML = ""
    let menuCategories = JSON.parse(response);
    for (let index = 0; index < menuCategories.length; index++) {
      const menu = menuCategories[index];

      let menuHTML = insertProperty(categoryString, "{{name}}", menu.name);
      menuHTML = insertProperty(menuHTML, "{{short_name}}", menu.short_name);
      menuListHTML = menuListHTML + menuHTML;
      // console.log(menuListHTML)
    }
    document.getElementById("main-content").innerHTML += menuListHTML;
  });

}

function loadMenuCategories() {
  loadMenuCategoriesTitle();
  showMenuCategory();
  switchActive();
}

// for single category
function loadMenuTitle(menuItemsHtml, category) {
  ajaxGet("snippets/menu-items-title.html", function (response) {
    let titleHtml = response;
    titleHtml = insertProperty(titleHtml, "{{name}}", category.name);
    titleHtml = insertProperty(titleHtml, "{{special_instructions}}", category.special_instructions);

    document.getElementById("main-content").innerHTML = titleHtml + menuItemsHtml;
  });
};

function showMenus(catShortName) {
  let menuItemUrl = "https://davids-restaurant.herokuapp.com/menu_items.json";

  ajaxGet(`${menuItemUrl}?category=${catShortName}`, function (response) {
    let res = JSON.parse(response);
    let menu_items = res.menu_items;
    let cat = res.category;
    let menuItemsHtml = '';
    for (let index = 0; index < menu_items.length; index++) {
      const item = menu_items[index];

      let itemHtml = insertProperty(menuItemString, "{{short_name}}", item.short_name);
      itemHtml = insertProperty(itemHtml, "{{catShortName}}", catShortName);
      itemHtml = insertProperty(itemHtml, "{{small_portion_name}}", item.small_portion_name);
      itemHtml = insertProperty(itemHtml, "{{price_small}}", item.price_small);
      itemHtml = insertProperty(itemHtml, "{{price_large}}", item.price_large);
      itemHtml = insertProperty(itemHtml, "{{large_portion_name}}", item.large_portion_name);
      itemHtml = insertProperty(itemHtml, "{{name}}", item.name);
      itemHtml = insertProperty(itemHtml, "{{description}}", item.description);
      menuItemsHtml += itemHtml;
    }
    // get the snippet html
    loadMenuTitle(menuItemsHtml, cat);

  });

}
function loadMenuItems(catShortName) {
  // load data menu-item.json
  showMenus(catShortName);
}