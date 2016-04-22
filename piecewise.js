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
		var bounds = latexifyBounds(stringPairs[i][1], vars);
		result.concat("\n \\hfill ");
		result.concat(expression);
		result.concat("\\hfill &");
		result.concat(bounds);
		result.concat("\\\\\n");//Dunno about this
	}
	result = result.concat("\\end{cases}");
	result.concat("\n \\]")
	return result;
	//window.alert(result);
}
var latexifyBounds = function(boundString, vars){
	var inclusiveLower = boundString.charAt(0) === "[";
	var inclusiveUpper = boundString.charAt(boundString.length - 1) === "]";
	var boundArr = boundString.substring(1, boundString.length-1).split(",");
	var boundVar = vars.split(",")[0]; 
	var result = "".concat(boundArr[0]);
	if (inclusiveLower){
		result.concat(" \\leq ".append(boundVar));
	}
	else {
		result.concat(" < ".append(boundVar));
	}
	if (inclusiveUpper){
		result.concat(" \\leq ".append(boundArr[1]));
	}
	else {
		result.concat(" < ".append(boundArr[1]));
	}
	result.concat(boundString[1]);
	return result;
}
var latexifyExpr = function(exprString){
	
}

"""
replace slashes with \frac
"""
var replaceSlashes = function(expr){
	var lowerIndex = 0;
	var index = str.indexOf("\/");
	while (index !== -1) {
		var reversed = reverseString(expr.substring(lowerIndex, index));\
		var numerator = reverseString(parseFirstNumber(reversed));
		var denominator = parseFirstNumber(expr.substring(index + 1, expr.length);
		expr.replace(numerator, "\\frac{".append(numerator).concat("}{"));
		expr.replace(denominator, denominator.concat("}"));
	}
	
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function reverseString(str) {
    return str.split('').reverse().join('');
}
function parseFirstNumber(str){
	str = str.trim();
	var result = "";
	var i = 0;
	while (!isNan(parseInt(str[i]))){
		result.append(str[i]);
		i += 1;
	}
	return result;
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

