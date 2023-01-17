fetch(cockTailApi)
.then(function(response){
  console.log(response);
  return(response.json());
})
.then(function(data){
  console.log(data);
})



// <div class="input-group mb-3">
// <input type="text" class="form-control" placeholder="Liquor">
// <button class="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
// </div> */



 const cockTailSrcByName = "http://www.thecocktaildb.com/api/json/v1/1/search.php?s="; // these are full and working api links and are only examples
 const rndCocktail = "http://www.thecocktaildb.com/api/json/v1/1/random.php";

 var cockTailApi = "http://www.thecocktaildb.com/api/json/v1/1/";
// splitting these links into pieces for easier mix and matching later to return different drink names to it later...

const paramSearch = "search.php?s="
let srcName = "margarita"

var apiSrcReturn = [];

fetch(cockTailApi + paramSearch + srcName)
.then(function(response){
  console.log("this should return margarita---------: ",response);
  return(response.json());
})
.then(function(data){
  console.log(data);
})

$( "#button-addon2" ).click(function() {
  var thing1 = $(".searchDrink");
  srcName = thing1.val();
  apiReturnByName();
  console.log("loggin apisrcReturn--", apiSrcReturn)

  var tableBody = $("#tablebody").children().removeProp()
  console.log("logging tabble body-- ",);
});



function apiReturnByName (){
  fetch(cockTailApi + paramSearch + srcName) // later on srcName should be whatever the user wants to search the database for as in whatever drink they want to search for and the database returns any and all cocktails with that string in it.
  .then(function(response){
    return(response.json());
  })
  .then(function(data){
    console.log(`searched for: ${srcName} :api returned- \n`,data);// NOTE: later this should return the drink names and briefe info to the html
    apiSrcReturn = data;
  })
}

apiReturnByName();





var btn = document.getElementById("open-modal");
var modal = document.getElementById("my-modal");
var xBtn = document.getElementById("close-me");


btn.addEventListener("click", function(){
  console.log("btn")
  modal.setAttribute("style", "display: block");
})

xBtn.addEventListener("click", function(){
  modal.setAttribute("style", "display: none");
})
