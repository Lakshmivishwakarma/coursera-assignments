// Event handling
function handler(r){

    var name = r.responseText;
    var content  = document.querySelector("#content")
    content.innerHTML =  "<h2>Hello " + name + "!</h2>";
}
function detailsHandler(r){
  console.log(r);
  var person = JSON.parse(r.response);
  console.log(person)
  var details  = document.querySelector("#details1")
  details.innerHTML =  "<h1>" + person.name + "</h1>";
  details  = document.querySelector("#details2")
  details.innerHTML =  "<h2>" + person.age + "</h2>";
  details  = document.querySelector("#details3")
  details.innerHTML =  "<h3>" + person.drivinngLicense + "</h3>";
  }




document.addEventListener("DOMContentLoaded",
  function (event) {
    console.log('Document loaded')
    // Unobtrusive event binding
    document.querySelector("button")
      .addEventListener("click", function () {
        console.log('Button Click')

        // Call server to get the name
        $ajaxUtils.sendGetRequ6est("https://mocki.io/v1/a3d8044c-7c4b-4459-aeeb-c94122b52fa2", detailsHandler);
       
       
        $ajaxUtils.sendGetRequest("data/name.txt", handler);

      
      });
    console.log('Document loaded Complete')
  }
);

