//USAGE: parse data from regex file and put in array; pass array to search() & call search() in searcher.js
//PARAMETERS: None
//RETURNS: None, but calls search() in searcher.js
function getJSON(){

  var highlightArray = []
  //fetch("https://raw.githack.com/ethanctrooer/AP-Style-Reviewer/master/regEx_data.json")
  //^dev url, v production url
  fetch("https://cdn.statically.io/gh/ethanctrooer/AP-Style-Reviewer/8cbfa560/regEx_data.json")
  .then(response => response.json())
  //.then(data => console.log(data));


  .then(data => {

    //var highlightArrayJSON = JSON.parse(data.regEx_array)
    var rawData = data.regEx_array
    //console.log(rawData)


    for(var x of rawData){
      if(rawData.hasOwnProperty(data.keys)){
      }
      var temparray = []
      temparray.push(x.regEx)
      temparray.push(x.desc)
      highlightArray.push(temparray)
      //console.log(x)
    }

    console.table(highlightArray)

    search(highlightArray)

  })

  //return highlightArray

}
