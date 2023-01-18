


$(function () {
  let drinkName // <-- this needs to come from the table
  let videoUrl;


 const cockTailSrcByName = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="; // these are full and working api links and are only examples
 const rndCocktail = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

 var cockTailApi = "https://www.thecocktaildb.com/api/json/v1/1/";
// splitting these links into pieces for easier mix and matching later to return different drink names to it later...


const paramSearchIngre = "filter.php?i="
const paramId = "lookup.php?i="



var apiSrcReturn = [];
var srcDrinkConts = [];
let srcIngre = "" ; // leave this in the global scope it makes life more easier :) dpfl'skjng ;sdlkfnds;lfnkds;flkn

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


function writeTable(arrOfData){
  console.log("went to writetable")
  console.log(arrOfData);
  wipeTable();
  arrOfData.forEach(drink => {
    console.log(drink);
    //$("#drink-results-go-here").append($("<tr>")).append($("<td>")).text(`${drink.info.drinks[0].strDrink}`),($("<td>")).text(`${'dlfdf'}`)

    $("#drink-results-go-here").append($(`<tr><td>${drink.info.drinks[0].strDrink}</td><td>xxxxx</td></tr>`))
    
  
  })
  
}

function wipeTable(){
  console.log("went to wipetable")
  $("#drink-results-go-here").empty()
 // corrin smort
}

/*strIngredient1
: 
"Gin"
strIngredient2
: 
"Tequila"
strIngredient3
: 
"Vodka"
strIngredient4
: 
"White rum"
strIngredient5
: 
"Triple Sec"
strIngredient6
: 
"Cherry Grenadine"
strIngredient7
: 
"Sweet and sour"
strIngredient8
: 
"Club soda"*/


/*          <tbody id="drink-results-go-here">
            <tr>
              <td>Mimosa</td>
              <td>Champagne, Orange Juice</td>
              <td>View Link</td>
              <td><button>X</button></td>
            </tr>
            <tr>
              <td>Moscow Mule</td>
              <td>Vodka, Lime Juice, Ginger Beer</td>
              <td>View Link</td>
              <td><button>X</button></td>

            </tr>
            <tr>
              <td>Tequila Sunrise</td>
              <td>Tequila, Grenadine, Orange Juice</td>
              <td>View Link</td>
              <td><button>X</button></td>
            </tr>
          </tbody>*/

/* <tbody id="drink-results-go-here">
<tr>
  <td>Mimosa</td>
  <td>Champagne, Orange Juice</td>
  <td>View Link</td>
  <td><button>X</button></td>
</tr>
<tr>
  <td>Moscow Mule</td>
  <td>Vodka, Lime Juice, Ginger Beer</td>
  <td>View Link</td>
  <td><button>X</button></td>

</tr>
<tr>
  <td>Tequila Sunrise</td>
  <td>Tequila, Grenadine, Orange Juice</td>
  <td>View Link</td>
  <td><button>X</button></td> */


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


});