/**
 * @Author: John Isaacs <john>
 * @Date:   06-Feb-172017
 * @Filename: index.js
 * @Last modified by:   john
 * @Last modified time: 17-Feb-172017
 */
var rows, columns, minc, cells;
var firstline = true;
var fullpizza = [];
var slices = [];
var filename;
var lineNo = 0;

var rowcheck = 1;
var columncheck = 1;

var fs = require('fs')
var Genetic = require('genetic-js-no-ww')
// again
process.argv.forEach(function(val, index, array) {
  filename = val;
});


var LineByLineReader = require('line-by-line'),
  lr = new LineByLineReader(filename);

lr.on('error', function(err) {
  console.log(error);
  // 'err' contains error object
});

lr.on('line', function(line) {
  processPizzaLine(line);
  // 'line' contains the current line without the trailing newline character.
});

lr.on('end', function() {
  // All lines are read, file is closed now.
  //console.log(fullpizza);

    quickSolution(fullpizza,minc,minc);
    console.log(slices.length);
    writeOutput(slices);
  //goGenetics();


});

function processPizzaLine(line) {
  if (firstline) {
    firstline = false;
    rows = parseInt(line.split(" ")[0]);
    columns = parseInt(line.split(" ")[1]);
    minc = parseInt(line.split(" ")[2]);
    cells = parseInt(line.split(" ")[3]);
    console.log("rows: " + rows + " columns: " + columns + " minimum item: " + minc + " max cells: " + cells);
  } else {
    var row = [];
    for (var c = 0; c < columns; c++) {
      row.push(line[c]);
    }
    fullpizza.push(row);
    lineNo++;
  }
}

function quickSolution(fullPizza,rowcheck,colcheck) {
  var slices = [];
  var column = 0;
  var row = 0;
  var startrow = 0;
  var startcolumn = 0;
  var endrow = 0;
  var endcolumn = 0;
var counter =0;
  for (column = 0; column < columns; column++) {
    for (row = 0; row < rows; row++) {
      //console.log(row+":"+column);
      var currentSlice = [];
      var tcount = 0;
      var mcount = 0;


      //var slice = [row+" ", column+" ", (Math.min(row+(cells-1),rows-1))+" ", column+" "];
//console.log("before");


//for(var span =1; span<=cells; span++){
  flag = false;
  bust = false;

      if (isNaN(fullPizza[row][column])) {
        //console.log("after");
        startrow = row;
        startcolumn = column;


        checkingloop:
          //for (var c = startcolumn; c < Math.min(startcolumn+(columncheck), columns); c++) {
            //for (var r = startrow; r < Math.min(startrow+rowcheck, rows); r++) {
              var c = startcolumn;
              var r = startrow;
//console.log(entity);
              while(c < Math.min(startcolumn+(colcheck), columns)&&!bust){
                //console.log("col"+parseInt(entity[counter]));
              r = startrow;
              while(r < Math.min(startrow+(rowcheck), rows)&&!bust){
                //console.log("row"+parseInt(entity[counter]));
              counter++;
              if (fullPizza[r][c] === 'T') {
                tcount++;
              }
              if (fullPizza[r][c] === 'M') {
                mcount++;
              }

              if(mcount+tcount > cells){bust = true;}
              //if(!flag){
              fullPizza[r][c] = slices.length;
            //}
              //console.log(tcount+":"+mcount);
              if ((parseInt(tcount) >= parseInt(minc)) && (parseInt(mcount) >= parseInt(minc)) && !bust) {

                flag = true;
                //storeSlice(startrow, startcolumn, r, c);

                //flag=false;
                ////break checkingloop;
                //if(r <)
                //storeSlice(startrow, startcolumn, r, c);
                //console.clear();
                //console.log(fullPizza);
                //console.log(tcount +":"+mcount+":"+minc);

                //break checkingloop;
              }


              r++;
            }
            c++;
          }
        if (flag) {
         //console.log(fullPizza);
          storeSlice(fullPizza,startrow, startcolumn, r-1, c-1);
          //break checkingloop;
          //for(var x = startcolumn; x<(c-1);x++){
          //  for(var y = startrow; y<(r-1);y++){
            //    fullPizza[y][x] = slices.length;
          //  }
          //}
          //console.log(slices.length);
        }
      }

      //}
    }
  }

  return slices.length;
}

function storeSlice(fullPizza,startr, startc, endr, endc) {
  var slice = [startr + " ", startc + " ", endr + " ", endc + " "];
  //var width = endc-startc;
  //var height = endr-startr;
  //for(var x = startc; x<endc;x++){
  //  for(var y = startr; y<endr;y++){
  //      fullPizza[y][x] = slices.length;
  //  }
  //}



  slices.push(slice);
}

function writeOutput(slices) {
  //console.log(slices.length);
  var logger = fs.createWriteStream(filename + ".out", {
    flags: 'w' // 'a' means appending (old data will be preserved)
  });

  logger.write(slices.length.toString().trim()); // append string to your file
  logger.write("\n");
  for (var i = 0; i < slices.length; i++) {
    var str = slices[i].toString();
    str = str.replace(/,/g, '');
    logger.write(str.trim());
    logger.write("\n");
  }
  logger.end();
}

// function checkNeighbourhood(var thisPosX, var thisPosY, var current){
//    var startPosX = thisPosX;
//    var startPosY = thisPosY;
//
//
//    var endPosX =   (thisPosX + 1 > rows) ? thisPosX : thisPosX+1;
//    var endPosY =   (thisPosY + 1 > columns) ? thisPosY : thisPosY+1;
// //   // See how many are alive
// //   for (int rowNum=startPosX; rowNum<=endPosX; rowNum++) {
// //       for (int colNum=startPosY; colNum<=endPosY; colNum++) {
// //         // All the neighbors will be grid[rowNum][colNum]
// //         return current == fullPizza[rowNum][colNum];
// //       }
// //     }
// }

var lastscore =0;

var genetic = Genetic.create();
genetic.optimize = Genetic.Optimize.Maximize;
genetic.select1 = Genetic.Select1.Tournament2;
genetic.select2 = Genetic.Select2.Tournament2;


goGenetics = function(){

  var config = {
			"iterations": 40000
			, "size": 250
			, "crossover": 0.3
			, "mutation": 0.3
			, "skip": 20
		};
  //quickSolution(fullpizza,rowcheck,columncheck);
  //console.log(slices);

  genetic.evolve(config);
  //writeOutput(slices);
}

genetic.seed = function() {

  function randomString(len) {
		var text = "";
		var charset = "123456";
		for(var i=0;i<len;i++)
			text += charset.charAt(Math.floor(Math.random() * charset.length));

		return text;
	}

	// create random strings that are equal in length to solution
	return randomString((rows*columns)/minc);
};
genetic.mutate = function(entity) {

	function replaceAt(str, index, character) {
		return str.substr(0, index) + character + str.substr(index+character.length);
	}

	// chromosomal drift
	var i = Math.floor(Math.random()*entity.length)
	return replaceAt(entity, i, String.fromCharCode(entity.charCodeAt(i) + (Math.floor(Math.random()*2) ? 1 : -1)));
};
genetic.crossover = function(mother, father) {
	// two-point crossover
	var len = mother.length;
	var ca = Math.floor(Math.random()*len);
	var cb = Math.floor(Math.random()*len);
	if (ca > cb) {
		var tmp = cb;
		cb = ca;
		ca = tmp;
	}

	var son = father.substr(0,ca) + mother.substr(ca, cb-ca) + father.substr(cb);
	var daughter = mother.substr(0,ca) + father.substr(ca, cb-ca) + mother.substr(cb);

	return [son, daughter];
};


genetic.fitness = function(entity) {
	var fitness = 0;

  fitness = quickSolution(fullpizza,entity);
  if(fitness>0){
    console.log(fitness);
  }
	//var i;
	//for (i=0;i<entity.length;++i) {
		// increase fitness for each character that matches
	//	if (entity[i] == this.userData["solution"][i])
	//		fitness += 1;

		// award fractions of a point as we get warmer
	//	fitness += (127-Math.abs(entity.charCodeAt(i) - this.userData["solution"].charCodeAt(i)))/50;
//	}
	return fitness;
};

genetic.generation = function(pop, generation, stats) {
	// stop running once we've reached the solution
	return true;
};
