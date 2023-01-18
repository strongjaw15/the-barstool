$(function () {
  let videoUrl;
  let forIngredients;


 const cockTailSrcByName = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="; // these are full and working api links and are only examples
 const rndCocktail = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

 var cockTailApi = "https://www.thecocktaildb.com/api/json/v1/1/";
// splitting these links into pieces for easier mix and matching later to return different drink names to it later...


const paramSearchIngre = "filter.php?i="
const paramId = "lookup.php?i="



var apiSrcReturn = [];
var srcDrinkConts = [];
let srcIngre = "" ; // leave this in the global scope it makes life more easier :) dpfl'skjng ;sdlkfnds;lfnkds;flkn

// This is the search button.
$( "#search-button-yeah" ).click(function() {
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

// This is some wizard asynchronous code that Gary and Dani's boyfriend co-authored.
async function get8Drinks(drinkIDs){

  const arrOfData = await Promise.all( 
    drinkIDs.map( async (drinkId) => {
      const newObj = { id: drinkId }
      const resp = await fetch(cockTailApi + paramId + drinkId)
      const drinkInfo = await resp.json()
      newObj.info = drinkInfo
      return newObj
    })
  )

  
  writeTable(arrOfData);
}

// This populates the table with search results.
function writeTable(arrOfData){
  console.log("went to writetable")
  console.log(arrOfData);
  forIngredients = arrOfData
  wipeTable();
  arrOfData.forEach((drink, i) => {
    console.log(drink);
    //$("#drink-results-go-here").append($("<tr>")).append($("<td>")).text(`${drink.info.drinks[0].strDrink}`),($("<td>")).text(`${'dlfdf'}`)

    $("#drink-results-go-here").append($(`<tr><td>${drink.info.drinks[0].strDrink}</td><td>${ingredients(i)}</td><td><button id="btnbruh">${`View Tutorial`}</button></td></tr>`))
    $("#btnbruh").data("id", `${drink.info.drinks[0].strDrink}`);
  })
}

// This gets the ingredients for the table.
function ingredients(i){
  let ingredientList = []
  for(index=1;index<16;index++){
    let ingredientNumber = `strIngredient${index}`
    if (forIngredients[i].info.drinks[0][ingredientNumber] != null){
      ingredientList.push(forIngredients[i].info.drinks[0][ingredientNumber])
    }
  }
  return ingredientList.join(", ")
}

// This is the event listener for the video tab button.
$("#drink-results-go-here").on("click", "#btnbruh", function(){
  searchYoutube($(this).data("id"));
  var newTab = "https://strongjaw15.github.io/the-barstool/assets/html/video.html"
  window.open(newTab);
})

// This wipes the table contents before a new population.
function wipeTable(){
  console.log("went to wipetable")
  $("#drink-results-go-here").empty()
 // corrin smort
}

// This searches youtube for the drink tutorial video and saves the video url.
function searchYoutube(drinkName){
  fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${drinkName} drink tutorial&type=video&key=AIzaSyBgNbBjMVwGDdZ73CdMuSGRUcsWDxKD7HI`)
  .then(function(reply){
    return reply.json()
  })
  .then(function(data){
    videoUrl = `https://youtu.be/${data.items[0].id.videoId}`
    localStorage.setItem("videoUrl", videoUrl);
  })
}

// This is a commented out modal that we might not use.

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
});