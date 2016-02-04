$(document).ready(function() {
    $('#submitButton').click(function() {
      input($('#inputMatrix1').val(), $('#inputMatrix2').val());
    });
});
var input = function(l, r) {
	var lmat = JSON.parse(l)
	var rmat = JSON.parse(r)
	var product = math.multiply(lmat, rmat);
	latexify(lmat, rmat, product);
	//console.log(Array.isArray(lmat));
	//console.log(Array.isArray(product));
	//window.alert(product);

}

var latexify = function(matrix) {
	var numRows = matrix.length;
	var numCols = matrix[0].length;
	var result = "\\begin{bmatrix}\n   ";
	for (var i = 0; i < numRows; i++) { //number of columns
		for (var j = 0; j < numCols; j++) { //through rows
			result = result.concat(matrix[i][j].toString());
			if (j != numCols - 1) {
				result = result.concat(' & ');
			}
		}
		result = result.concat("\n   ");		
	}
	result = result.concat("\\end{bmatrix}")
	$("#result").val(result);
	//window.alert(result);
}


/***M = \begin{bmatrix}
       \frac{5}{6} & \frac{1}{6} & 0           \\[0.3em]
       \frac{5}{6} & 0           & \frac{1}{6} \\[0.3em]
       0           & \frac{5}{6} & \frac{1}{6}
     \end{bmatrix}
     ***/