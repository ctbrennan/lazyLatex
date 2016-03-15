$(document).ready(function() {
    $('#submitButton2').click(function() {
      var op = $('input[name="operation"]:checked').val();
      //console.log(op);      
      input($('#inputFuncLetter').val(), $('#inputPart1').val(), $('#inputPart2').val(), $('#inputPart3').val(), op);
      return false;
    });
});

var input = function(funcLetter, piece1, piece2, piece3, op) {
	var p1 = JSON.parse(piece1);
	var p2 = JSON.parse(piece2);
	var p3 = JSON.parse(piece3);
	"""
	var latexL = latexifyMatrix(lmat);
	var latexR = latexifyMatrix(rmat);
	var result = 0;
	if (op === 'mul') {
		result = math.multiply(lmat, rmat);
	}
	if (op === 'add') {
		result = math.add(lmat, rmat);
	}
	if (op === 'sub') {
		result = math.subtract(lmat, rmat);
	}
	var latexResult = latexifyMatrix(result);
	var equation = equationLatex(latexL, latexR, latexResult, op);
	"""
	$("#result").val(equation);
}

var latexifyFunc = function(func) {
	var numRows = matrix.length;
	var numCols = matrix[0].length;
	var result = "\\begin{bmatrix}\n   ";
	for (var i = 0; i < numRows; i++) {
		for (var j = 0; j < numCols; j++) {
			result = result.concat(matrix[i][j].toString());
			if (j != numCols - 1) {
				result = result.concat(' & ');
			}
		}
		if (i != numRows - 1) {
			result = result.concat("\n \\\\");	
		}
		else {
			result = result.concat("\n");
		}

	}
	result = result.concat("\\end{bmatrix}")
	return result;
	//window.alert(result);
}
var equationLatex = function(m1, m2, m3, op) {
	var result = "$";
	result = result.concat(m1);
	if (op === 'mul') {
		result = result.concat("\n*\n");
	}
	if (op === 'add') {
		result = result.concat("\n+\n");
	}
	if (op === 'sub') {
		result = result.concat("\n-\n");
	}
	result = result.concat(m2);
	result = result.concat("\n=");
	result = result.concat(m3);
	return result.concat("$");
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

