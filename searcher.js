function search(highlightArrayInput){

  var rawInput = document.getElementById("inputBox_CE").innerText

  //get info of current caret position
  

  //next project: try to get the thing to highlight the text in the input box as it's being inputted

  var highlightArray = []
  for(var x of highlightArrayInput){
    //forward slashes removed from regex file b/c RegExp adds them automatically;
    //"g" tag adds global tag to regular expression.
    var regexObject = new RegExp(x, "g")
    highlightArray.push(regexObject)
  }

  console.log("highlightarray: " + highlightArray)

  console.log('here')

  var finalMutableString = [rawInput]

  //do NOT use for in! that will only return index, use for OF to get value at index.
  for(var x of highlightArray){
    console.log("x: " + x)
    finalMutableString[0] = addToHighlights(finalMutableString[0], x)
  }

  var finalString = finalMutableString[0]

  document.getElementById("errorsHighlighted").innerHTML = finalString
  document.getElementById("inputBox").value = finalString
  document.getElementById("inputBox_CE").innerHTML = finalString

  //reset position of caret after replacement


  //End of search()

}

//USAGE: find matching regEx from text.
//PARAMETERS: oldInput is input text, regexExpression is the regular expression.
//RETURNS: text with <mark></mark> around matching regEx.
function addToHighlights(oldInput, regexExpression){
  return oldInput.replace(regexExpression, markAdder)
}

//USAGE: add the <mark></mark> tag around inputted text.
//PARAMETERS: See documentation for p1, offset & inputString. used input is match, which automatically comes from .replace
//RETURNS: text with <mark></mark> around it
function markAdder(match, p1, offset, inputString){
  var mark = "<mark>"
  return mark.concat(match, "</mark>")
}
