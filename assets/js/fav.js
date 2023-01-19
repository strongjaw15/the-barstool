let videoSearch;

// This gets the saved drinks from local storage.
let savedDrinks = JSON.parse(localStorage.getItem("savedIngredients"));
console.log(savedDrinks)

// This populates the table with the saved drinks.
for(i=0;i<savedDrinks.length;i++){
  $("tbody").append(`<tr><td>${savedDrinks[i].name}</td><td>${savedDrinks[i].ingredients}</td><td><button id="video-button" data-id="${savedDrinks[i].name}">View Tutorial</button></td></tr>`)
}

// This is the event listener for the video button.
$("tbody").on("click", "#video-button", function(){
  console.log($(this))
  console.log(`this is the drink name: ${$(this).data("id")}`)
  videoSearch=$(this).data("id")
  searchYoutube();
})

// This searches youtube for the drink tutorial video and saves the video url.
function searchYoutube(){
  fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${videoSearch} drink tutorial&type=video&key=AIzaSyBgNbBjMVwGDdZ73CdMuSGRUcsWDxKD7HI`)
  .then(function(reply){
    return reply.json()
  })
  .then(function(data){
    videoUrl = `https://youtu.be/${data.items[0].id.videoId}`
    console.log(`This is the video url: ${videoUrl}`)
    localStorage.setItem("videoUrl", videoUrl);
    openNewTab()
  })
}

// This actually opens the new tab once the video has been set.
function openNewTab(){
  var newTab = "./video.html"
  window.open(newTab);
}
