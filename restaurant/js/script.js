
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
});

// for index.html
function showData() {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (req.readyState === 4 && req.status === 200) {
      document.getElementById("main-content").innerHTML = req.responseText;
      
    }
  }
  req.open("GET", "snippets/home_snippets.html", true);
  req.send();
}
document.addEventListener("DOMContentLoaded", showData);
// index.html ends here



function loadMenuCategoriesTitle() {

  var req = new XMLHttpRequest();
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
          // document.getElementById("menu-title").innerHTML = req.responseText;
          document.getElementById("main-content").innerHTML = req.responseText;

      }
  }
  req.open("GET", "snippets/categories-title-snippet.html", true);
  req.send();

}
function insertProperty(us, property, value) {
  let str;
  str = us.replace(new RegExp(property, 'g'), value);
  return str
}


function showMenuCategory() {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
          let menuListHTML = ""

          let menuCategories = JSON.parse(req.response);
          for (let index = 0; index < menuCategories.length; index++) {
              const menu = menuCategories[index];
              
              let menuHTML = insertProperty(categoryString, "{{name}}", menu.name);
              menuHTML = insertProperty(menuHTML, "{{short_name}}", menu.short_name);
              
              
              menuListHTML = menuListHTML + menuHTML;
              // console.log(menuListHTML)
          }
          document.getElementById("main-content").innerHTML += menuListHTML;

      }
  }
  req.open("GET", "https://davids-restaurant.herokuapp.com/categories.json", true);
  req.send();
}

function loadMenuCategories(){
  loadMenuCategoriesTitle();
  showMenuCategory();

}

// for single category
function loadMenuTitle(menuItemsHtml, category){
  var req = new XMLHttpRequest();
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
          let titleHtml =  req.responseText;
          titleHtml = insertProperty(titleHtml, "{{name}}", category.name);
          titleHtml = insertProperty(titleHtml, "{{special_instructions}}", category.special_instructions);

        document.getElementById("main-content").innerHTML = titleHtml + menuItemsHtml;

      }
  }
  req.open("GET", "snippets/menu-items-title.html", true);
  req.send();
}
function showMenus(catShortName){
  let menuItemUrl = "https://davids-restaurant.herokuapp.com/menu_items.json";

  var req = new XMLHttpRequest();
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        let response = JSON.parse(req.response);
        let menu_items = response.menu_items;
        let cat = response.category;
        let menuItemsHtml ='';
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
        
        // render it to main content 
        // document.getElementById("main-content").innerHTML = menuItemsHtml;

      }
  }
  req.open("GET", `${menuItemUrl}?category=${catShortName}`, true);
  req.send();
}
function loadMenuItems(catShortName){
  // load data menu-item.json
  showMenus(catShortName);


}