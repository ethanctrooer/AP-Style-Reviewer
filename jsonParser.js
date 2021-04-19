async function getJSON(){

  var highlightArray = []
  fetch('regEx_data.json')
  .then(response => response.json())
  //.then(data => console.log(data));


  .then(data => {

    for(var x of data.regEx_array){
      highlightArray.push(x)
      console.log(x)
    }
  })

  return highlightArray

}
