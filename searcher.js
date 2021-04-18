function search(){
  var rawInput = document.querySelector('.searchField').value

  //next project: try to get the thing to highlight the text in the input box as it's being inputted
    //UPDATE: Project done! see active code below. This code is now depricated.
    /*
  //here's all the regex for finding stuff to highlight; add to here in order to find new ones.
  //let newInput = rawInput.replace((/\S\.\.\.\S/g), markAdder);
  //let newInput2 = newInput.replace(/said[^.]/g, markAdder);
  //document.getElementById("errorsHighlighted").innerHTML = newInput2
    */

  //add new values to be highlighted here!
  var highlightArray = [/\S\.\.\.\S/g, /said[^.]/g]
  var finalMutableString = [rawInput]
  //do NOT use for in! that will only return index, use for OF to get value at index.
  for(var x of highlightArray){
    finalMutableString[0] = addToHighlights(finalMutableString[0], x)
  }

  var finalString = finalMutableString[0]

  document.getElementById("errorsHighlighted").innerHTML = finalString

  //End of search()

}

// ff10

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
