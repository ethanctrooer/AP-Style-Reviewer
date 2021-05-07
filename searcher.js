function search(highlightArrayInput){

  var selBox = document.getElementById("inputBox_CE")
  var rawInput = document.getElementById("inputBox_CE").innerText

  //get info of current caret position
  var currentCaretPos = getCaretCharacterOffsetWithin(selBox)

  //next project: try to get the thing to highlight the text in the input box as it's being inputted

  var highlightArray = []
  for(var x of highlightArrayInput){
    //forward slashes removed from regex file b/c RegExp adds them automatically;
    //"g" tag adds global tag to regular expression.
    var regexObject = new RegExp(x, "g")
    highlightArray.push(regexObject)
  }

  //console.log("highlightarray: " + highlightArray)

  //console.log('here')

  var finalMutableString = [rawInput]

  //do NOT use for in! that will only return index, use for OF to get value at index.
  for(var x of highlightArray){
    //console.log("x: " + x)
    finalMutableString[0] = addToHighlights(finalMutableString[0], x)
  }

  var finalString = finalMutableString[0]

  var selNode = getSelectionStart()
  //var offset = getCaretCharacterOffsetWithin(selNode)
  //selBox.normalize()
  var offset = getCaretCharacterOffsetWithin(selNode)

  document.getElementById("errorsHighlighted").innerHTML = finalString
  document.getElementById("inputBox").value = finalString
  document.getElementById("inputBox_CE").innerHTML = finalString

  //reset position of caret after replacement


  setCaret(selNode, offset)


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

//from https://stackoverflow.com/questions/4811822/get-a-ranges-start-and-end-offsets-relative-to-its-parent-container/4812022#4812022
function getCaretCharacterOffsetWithin(element) {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
    } else if ( (sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}

function testCaretPos(){
  //var selBox = document.getElementById("inputBox_CE")
  var caretBox = document.getElementById("caretPosOutput")

  var selNode = getSelectionStart()

  //console.log(getCaretCharacterOffsetWithin(selBox) + "LKAJHSFKLAUSHFKJANLJFHDLAKSD")

  caretBox.innerHTML = getCaretCharacterOffsetWithin(selNode)
  //console.log(getSelectionStart())
}

document.body.onkeyup = testCaretPos;
document.body.onmouseup = testCaretPos;

//from https://stackoverflow.com/questions/6249095/how-to-set-caretcursor-position-in-contenteditable-element-div
function setCaret(node, offset) {
    var el = document.getElementById("inputBox_CE")
    var range = document.createRange()
    var sel = window.getSelection()

    var childrenNodes = el.childNodes
    var counter = childrenNodes.length
    for(var i=0; i<childrenNodes.length; i++){
      console.log(node)
      console.log(childrenNodes[i])
      console.log(node.isEqualNode(childrenNodes[i]))
      counter--
      if(node.isEqualNode(childrenNodes[i])){
        break
      }
    }
    console.log(counter)

    //range.setStart(node, offset)
    //range.setStart(el.childNodes[counter], offset)
    range.setStart(el.childNodes[counter], offset)
    range.collapse(true)

    sel.removeAllRanges()
    sel.addRange(range)
}

//from https://stackoverflow.com/questions/1197401/get-element-node-at-caret-position-in-contenteditable
function getSelectionStart() {
   var node = document.getSelection().anchorNode;
   //return (node.nodeType == 3 ? node.parentNode : node);
   return node
}
