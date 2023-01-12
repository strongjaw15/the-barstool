const cockTailApi = "http://www.thecocktaildb.com/api/json/v1/1/random.php";

fetch(cockTailApi)
.then(function(response){
  console.log(response);
  return(response.json());
})
.then(function(data){
  console.log(data);
})

