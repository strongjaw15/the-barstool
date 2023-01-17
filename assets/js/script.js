let srcName = $("#search-input").val()
let drinkName // <-- this needs to come from the table
let videoUrl;

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
srcName = "margarita" // <-- don't need this anymore? -CW

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
  fetch(cockTailApi + paramSearch + srcName)
  .then(function(response){
    return(response.json());
  })
  .then(function(data){
    console.log(`searched for: ${srcName} :api returned- \n`,data);// NOTE: later this should return the drink names and briefe info to the html
    apiSrcReturn = data;
  })
}

apiReturnByName();

// This searches youtube for the drink tutorial video and saves the video url.
function searchYoutube(){
  fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${drinkName} drink tutorial&type=video&key=AIzaSyBgNbBjMVwGDdZ73CdMuSGRUcsWDxKD7HI`)
  .then(function(reply){
    return reply.json()
  })
  .then(function(data){
    videoUrl = `https://www.youtube.com/watch?v=${data.items[0].id.videoId}`
    localStorage.setItem("videoUrl", JSON.stringify(videoUrl))
  })
}



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
