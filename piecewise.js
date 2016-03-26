$(document).ready(function() {
    updateSlider(2);
    $('#submitButton').click(function() {
      var numFunc = $('input[name="numFunc"]').val();
      //console.log(numFunc);      
      var funcBoundPairs = [];
      for (i = 1; i <= numFunc; i++) {
      	var funcId = "#inputFunc".concat(i.toString());
      	var boundId = "#bound".concat(i.toString());
      	var func = $(funcId);
      	var bound = $(boundId);
      	var pair = [func, bound];
      	funcBoundPairs.push(pair);
      }
      //console.log(funcBoundPairs);
      input($("#inputFuncLetter"), $("#inputVars"), numFunc, funcBoundPairs);
      return false;
    });
});

var input = function(funcLetter, inputVars, numFunc, funcBoundPairs) {
	var funcLetter = JSON.parse(inputFuncLetter);
	var vars = JSON.parse(inputVars);
	var stringPairs = [];
	for (i = 0; i < numFunc; i++) {
		var func = JSON.parse(funcBoundPairs[i][0]);
		var bound = JSON.parse(funcBoundPairs[i][1]);
		stringPairs.push([func, bound]);
	}
	var latexResult = latexifyFunc(letter, vars, numFunc, stringPairs);
	$("#result").val(latexResult);
}

var latexifyFunc = function(funcLetter, vars, numFunc, stringPairs) {
	var result = "\\[\n   ";
	result.concat(funcLetter);
	result.concat("(".concat(vars.concat(")")));
	result.concat("\n \\begin{cases}");
	for (var i = 0; i < numFunc; i++) {
		var expression = latexifyExpr(stringPairs[i][0]);
		var bounds = latexifyBounds(stringPairs[i][1]);
		result.concat("\n \\hfill ");
		result.concat(expression);
		result.concat("\\hfill &");
		result.concat(bounds);
	}
	result = result.concat("\\end{cases}");
	result.concat("\n \\]")
	return result;
	//window.alert(result);
}
var latexifyBounds = function(boundString){

}
var latexifyExpr = function(exprString){
	
}


/***
\[
 f(n) =
  \begin{cases} 
      \hfill \frac{n}{2}    \hfill & \text{ if $n$ is even} \\
      \hfill -\frac{n-1}{2} \hfill & \text{ if $n$ is odd} \\
  \end{cases}
\]
     ***/

