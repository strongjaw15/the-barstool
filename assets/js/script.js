const cockTailApi = "http://www.thecocktaildb.com/api/json/v1/1/random.php";

fetch(cockTailApi)
.then(function(response){
  console.log(response);
  return(response.json());
})
.then(function(data){
  console.log(data);
})



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