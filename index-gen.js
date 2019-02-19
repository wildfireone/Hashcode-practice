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

var fs = require('fs')
var Genetic = require('genetic-js')
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



  goGenetics();
  // All lines are read, file is closed now.
  //console.log(fullpizza);

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





function storeSlice(startr, startc, endr, endc) {
  var slice = [startr + " ", startc + " ", endr + " ", endc + " "];
  //var width = endc-startc;
  //var height = endr-startr;



  slices.push(slice);
}




var genetic = Genetic.create();
genetic.optimize = Genetic.Optimize.Maximize;
genetic.select1 = Genetic.Select1.Tournament2;
genetic.select2 = Genetic.Select2.Tournament2;

goGenetics = function(){
var generations =1;
var config = {
    "iterations": generations
    , "size": 1
    , "crossover": 0.3
    , "mutation": 0.5
    , "skip": 5
  };
  var userData = {
    "rows": rows,
    "columns": columns,
    "cells": cells,
    "pizza":fullpizza,
    "slices":slices,
    "minc":minc,
    "generations":generations,
    "filename":filename
  };
  genetic.evolve(config, userData);
}



genetic.seed = function() {

  function randomArray(len,max) {
		var set =[];
		//var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
		for(var i=0;i<len;i++){
			set.push(Math.floor(Math.random() * (max))+1);
    }

		return set;
	}

	// create random strings that are equal in length to solution
	return randomArray(parseInt(this.userData["rows"])*(parseInt(this.userData["columns"])),parseInt(this.userData["cells"]));
};

genetic.mutate = function(entity) {

	function replaceAt(set, index, value) {
		set[index] = value;
    return set;
	}

	// chromosomal drift
	var i = Math.floor(Math.random()*entity.length)

	return replaceAt(entity, i, entity[i] + Math.floor(Math.random()*2) ? 1: -1);
};
genetic.crossover = function(mother, father) {
	// two-point crossover
  //console.log(mother);
	var len = mother.length;
	var ca = Math.floor(Math.random()*len);
	var cb = Math.floor(Math.random()*len);
	if (ca > cb) {
		var tmp = cb;
		cb = ca;
		ca = tmp;
	}
		var motherCross = mother.slice(ca, cb-ca);
    var fatherCross = father.slice(ca, cb-ca);
    var son = father.slice(0,ca);
    var sonbottom = father.slice(cb,father.length);
    var daughter = mother.slice(0,ca);
    var daughterbottom = mother.slice(cb,father.length);

  //var son = father.substr(0,ca) + mother.substr(ca, cb-ca) + father.substr(cb);
	//var daughter = mother.substr(0,ca) + father.substr(ca, cb-ca) + mother.substr(cb);

  son.concat(motherCross);
  son.concat(sonbottom);

  daughter.concat(fatherCross);
  daughter.concat(daughterbottom);

	return [son, daughter];
};
genetic.fitness = function(entity) {
	var fitness = 0;
  //var quickSolution = this.userData["process"];

//var slices = [];//[]genetics.userData["slices"];

  var quickSolution = function(genetics,checks) {


    //var fullPizza = genetics.userData["pizza"].slice(0); ;
    var fullPizza = JSON.parse(JSON.stringify(genetics.userData["pizza"]));
    var column = 0;
    var row = 0;
    var rows = genetics.userData["rows"];
    var columns = genetics.userData["columns"];
    var minc = genetics.userData["minc"];
    var cells = genetics.userData["cells"];
    //var slices = genetics.userData["slices"];
  var slices = [];
  var slicetagger =0;

    for (column = 0; column < columns; column++) {
      for (row = 0; row < rows; row++) {
        if(true){
        var flag = false;


        var startrow = 0;
        var startcolumn = 0;
        var endrow = 0;
        var endcolumn = 0;
        //console.log(row+":"+column);
        var currentSlice = [];
        var tcount = 0;
        var mcount = 0;
        var rowcheck = Math.floor(cells/checks[row*column]);
        var columncheck = Math.floor(cells/rowcheck);


        //var slice = [row+" ", column+" ", (Math.min(row+(cells-1),rows-1))+checks[row*column]" ", column+" "];
  //console.log("before");


  //for(var span =1; span<=cells; span++){
    flag = false;

        if (isNaN(parseInt(fullPizza[row][column]))) {
          //console.log("after");
          startrow = row;
          startcolumn = column;

  //console.log(rowcheck);
          checkingloop:
            //for (var c = startcolumn; c < Math.min(startcolumn+(columncheck), columns); c++) {
              //for (var r = startrow; r < Math.min(startrow+rowcheck, rows); r++) {
                var c = startcolumn;
                var r = startrow;

                while(c < Math.min(startcolumn+(columncheck), columns)&&!flag ){
                //while(c < Math.min(startcolumn+(columncheck), columns) ){
                r = startrow;
                while(r < Math.min(startrow+(rowcheck), rows)&&!flag ){
                //while(r < Math.min(startrow+(rowcheck), rows) ){

                if (fullPizza[r][c] === 'T') {
                  tcount++;
                }
                if (fullPizza[r][c] === 'M') {
                  mcount++;
                }
                //if(!flag){
                fullPizza[r][c] = slicetagger;
              //}
                console.log(slicetagger+"->>>"+flag+">>>"+tcount+":"+mcount+":"+minc);
                if ((parseInt(tcount) >= parseInt(minc)) && (parseInt(mcount) >= parseInt(minc))&&!flag) {
                  console.log("flagging")
                  flag = true;
//c = c+1;
//r=r+1

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
            slicetagger++
          if (flag) {
            //storeSlice(startrow, startcolumn, r-1, c-1);
            //var slice = [startr + " ", startc + " ", endr + " ", endc + " "];
            var slice = [startrow + " ", startcolumn + " ", parseInt(r) + " ", parseInt(c) + " "];
            //var width = endc-startc;
            //var height = endr-startr;



            slices.push(slice);
            console.log("adding")
            console.log((fullPizza))
           //console.log(fullPizza);
            //storeSlice(startrow, startcolumn, r-1, c-1);
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
      }//end of while
      }
    }

//console.log(slices.length);

    return slices.length;
  }
fitness = quickSolution(this,entity);

//console.log(fitness);

  return fitness;

//return


};
genetic.generation = function(pop, generation, stats) {
	// stop running once we've reached the solution
  var current = pop[0].entity;

  var quickSolution = function(genetics,checks,filename) {
    //var fullPizza = genetics.userData["pizza"].slice(0); ;
    var fullPizza = JSON.parse(JSON.stringify(genetics.userData["pizza"]));
    var column = 0;
    var row = 0;
    var rows = genetics.userData["rows"];
    var columns = genetics.userData["columns"];
    var minc = genetics.userData["minc"];
    var cells = genetics.userData["cells"];
    //var slices = genetics.userData["slices"];
  var slices = [];
  var slicetagger =0;

    for (column = 0; column < columns; column++) {
      for (row = 0; row < rows; row++) {
        if(true){
        var flag = false;


        var startrow = 0;
        var startcolumn = 0;
        var endrow = 0;
        var endcolumn = 0;
        //console.log(row+":"+column);
        var currentSlice = [];
        var tcount = 0;
        var mcount = 0;
        var rowcheck = Math.floor(cells/checks[row*column]);
        var columncheck = Math.floor(cells/rowcheck);


        //var slice = [row+" ", column+" ", (Math.min(row+(cells-1),rows-1))+checks[row*column]" ", column+" "];
  //console.log("before");


  //for(var span =1; span<=cells; span++){
    flag = false;

        if (isNaN(parseInt(fullPizza[row][column]))) {
          //console.log("after");
          startrow = row;
          startcolumn = column;

  //console.log(rowcheck);
          checkingloop:
            //for (var c = startcolumn; c < Math.min(startcolumn+(columncheck), columns); c++) {
              //for (var r = startrow; r < Math.min(startrow+rowcheck, rows); r++) {
                var c = startcolumn;
                var r = startrow;

                while(c < Math.min(startcolumn+(columncheck), columns)&&!flag ){
                //while(c < Math.min(startcolumn+(columncheck), columns) ){
                r = startrow;
                while(r < Math.min(startrow+(rowcheck), rows)&&!flag ){
                //while(r < Math.min(startrow+(rowcheck), rows) ){

                if (fullPizza[r][c] === 'T') {
                  tcount++;
                }
                if (fullPizza[r][c] === 'M') {
                  mcount++;
                }
                //if(!flag){
                fullPizza[r][c] = slicetagger;
              //}
                //console.log(slicetagger+"->>>"+flag+">>>"+tcount+":"+mcount+":"+minc);
                if ((parseInt(tcount) >= parseInt(minc)) && (parseInt(mcount) >= parseInt(minc))&&!flag) {
                  //console.log("flagging")
                  flag = true;
//c = c+1;
//r=r+1

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
            slicetagger++
          if (flag) {
            //storeSlice(startrow, startcolumn, r-1, c-1);
            //var slice = [startr + " ", startc + " ", endr + " ", endc + " "];
            var slice = [startrow + " ", startcolumn + " ", parseInt(r-1) + " ", parseInt(c-1) + " "];
            //var width = endc-startc;
            //var height = endr-startr;



            slices.push(slice);
            //console.log("adding")
            //console.log((fullPizza))
           //console.log(fullPizza);
            //storeSlice(startrow, startcolumn, r-1, c-1);
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
      }//end of while
      }
    }


  function writeOutput(slices,filename) {
    console.log("slices:"+slices.length);
    var fs = require('fs');
    var logger = fs.createWriteStream(filename+ ".out", {
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

  writeOutput(slices,filename)
  }



  if(generation+1 == this.userData["generations"]){
    quickSolution(this,current,this.userData["filename"])

  }
  console.log("generation: "+generation);
	return true;
};
genetic.notification = function(pop, generation, stats, isFinished) {
	function lerp(a, b, p) {
		return a + (b-a)*p;
	}

	var value = pop[0].entity;
	this.last = this.last||value;

	if (pop != 0 && value == this.last)
		return;


	var solution = [];
	var i;

	var buf = "";
	buf += "*************************";
	buf += " " + generation + " ";
	buf += " " + pop[0].fitness.toPrecision(5) + " ";
	buf += "*************************\n";
	console.log(buf);

	this.last = value;
};
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
