//USAGE: parse data from regex file and put in array; pass array to search() & call search() in searcher.js
//PARAMETERS: None
//RETURNS: None, but calls search() in searcher.js
function getJSON(){

  var highlightArray = []
  fetch('regEx_data.json')
  .then(response => response.json())
  //.then(data => console.log(data));


  .then(data => {

    for(var x of data.regEx_array){
      highlightArray.push(x)
      console.log(x)
    }

    search(highlightArray)

  })

  //return highlightArray

}
