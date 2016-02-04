$(document).ready(function() {
    $('#submitButton').click(function() {
      input($('#inputMatrix1').val(), $('#inputMatrix2').val());
      return false;
    });
});
var input = function(l, r) {
	var lmat = JSON.parse(l)
	var rmat = JSON.parse(r)
	var product = math.multiply(lmat, rmat);
	var latexL = latexifyMatrix(lmat);
	var latexR = latexifyMatrix(rmat);
	var latexProd = latexifyMatrix(product);
	var equation = equationLatex(latexL, latexR, latexProd, 'mul');
	//console.log(equation);
	$("#result").val(equation);
}

var latexifyMatrix = function(matrix) {
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
	if (op === 'mul') {
		result = result.concat(m1);
		result = result.concat("\n*\n");
		result = result.concat(m2);
		result = result.concat("\n=");
		result = result.concat(m3);
	}
	return result.concat("$");
}


/***M = \begin{bmatrix}
       \frac{5}{6} & \frac{1}{6} & 0           \\[0.3em]
       \frac{5}{6} & 0           & \frac{1}{6} \\[0.3em]
       0           & \frac{5}{6} & \frac{1}{6}
     \end{bmatrix}
     ***/