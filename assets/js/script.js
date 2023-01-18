
let srcName = $("#search-input").val()
let drinkName // <-- this needs to come from the table
let videoUrl;

//fetch(cockTailApi)
//.then(function(response){
//  console.log(response);
//  return(response.json());
//})
//.then(function(data){
//  console.log(data);
//})




// <div class="input-group mb-3">
// <input type="text" class="form-control" placeholder="Liquor">
// <button class="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
// </div> */



 const cockTailSrcByName = "http://www.thecocktaildb.com/api/json/v1/1/search.php?s="; // these are full and working api links and are only examples
 const rndCocktail = "http://www.thecocktaildb.com/api/json/v1/1/random.php";

 var cockTailApi = "http://www.thecocktaildb.com/api/json/v1/1/";
// splitting these links into pieces for easier mix and matching later to return different drink names to it later...


const paramSearchIngre = "filter.php?i="
const paramId = "lookup.php?i="



var apiSrcReturn = [];

let srcIngre = "" ; // leave this in the global scope it makes life more easier :) dpfl'skjng ;sdlkfnds;lfnkds;flkn

$( "#button-addon2" ).click(function() {
  var thing1 = $("#drink-input");
  srcIngre = thing1.val();
  console.log("logging name input: ", srcIngre);
  apiReturnByName();
});

function apiReturnByName (){

  fetch(cockTailApi + paramSearchIngre + srcIngre) // later on srcName should be whatever the user wants to search the database for as in whatever drink they want to search for and the database returns any and all cocktails with that string in it.

  .then(function(response){
    return(response.json());
  })
  .then(function(data){
    console.log(`searched for: ${srcIngre} :api returned- \n`,data);// should be deleted before final product
    apiSrcReturn = data;
    var drinkIDs = []
    for(var i = 0; i < 8; i++){
      drinkIDs.push(data.drinks[Math.floor(Math.random()*(data.drinks.length - 0) + 0)].idDrink)
      
    }
    get8Drinks(drinkIDs);
  })
}

function get8Drinks(drinkIDs){
  console.log("loggin drink ids from get8drinks",drinkIDs)
  drinkIDs.forEach(element => {
    fetch(cockTailApi + paramId + element)
    .then(function(response){
      return (response.json());
    })
    .then(function(data){
      console.log(data);
    })
  });
}

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

// var btn = document.getElementById("open-modal");
// var modal = document.getElementById("my-modal");
// var xBtn = document.getElementById("close-me");


// btn.addEventListener("click", function(){
//   console.log("btn")
//   modal.setAttribute("style", "display: block");
// })

// xBtn.addEventListener("click", function(){
//   modal.setAttribute("style", "display: none");
// })
