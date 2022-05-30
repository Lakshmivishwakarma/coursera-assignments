let menuCategories = [];
const menuString = `<div class="col-md-3 col-sm-4 col-xs-6 col-xxs-12">
<a href="single-categories.html?short_name={{short_name}}" onclick="loadMenuItems('{{short_name}}');">
  <div class="category-tile">
    <img width="200" height="200" src="images/menu/{{short_name}}/{{short_name}}.jpg" alt="{{name}}">
    <span>{{name}}</span>
  </div>
</a>
</div>`;


function loadMenuItems(shortName){
    console.log(shortName)
}
function insertProperty(us, property, value) {
    let str;
    str = us.replace(new RegExp(property, 'g'), value);
    return str
}


function showMenus() {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            let menuListHTML = ""

            menuCategories = JSON.parse(req.response);
            for (let index = 0; index < menuCategories.length; index++) {
                const menu = menuCategories[index];
                
                let menuHTML = insertProperty(menuString, "{{name}}", menu.name);
                menuHTML = insertProperty(menuHTML, "{{short_name}}", menu.short_name);
                
                
                menuListHTML = menuListHTML + menuHTML;
                // console.log(menuListHTML)
            }



            document.getElementById("menu-categories").innerHTML = menuListHTML;

        }
    }
    req.open("GET", "https://davids-restaurant.herokuapp.com/categories.json", true);
    req.send();
}


function showMenuTitle() {

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


function loadMenuCategories(){
  showMenuTitle();
  // 
}


// (function () {
//   console.log("i Am called");
//   showData();
// })();