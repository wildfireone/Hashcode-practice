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
  quickSolution(fullpizza);
  //console.log(slices);
  writeOutput(slices);
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

function quickSolution(fullPizza) {
  var column = 0;
  var row = 0;
  var startrow = 0;
  var startcolumn = 0;
  var endrow = 0;
  var endcolumn = 0;

  for (column = 0; column < columns; column++) {
    for (row = 0; row < rows; row++) {
      //console.log(row+":"+column);
      var currentSlice = [];
      var tcount = 0;
      var mcount = 0;
      var rowcheck = cells/2;
      var columncheck = cells/rowcheck;

      //var slice = [row+" ", column+" ", (Math.min(row+(cells-1),rows-1))+" ", column+" "];
//console.log("before");


//for(var span =1; span<=cells; span++){
  flag = false;

      if (isNaN(fullPizza[row][column])) {
        //console.log("after");
        startrow = row;
        startcolumn = column;


        checkingloop:
          //for (var c = startcolumn; c < Math.min(startcolumn+(columncheck), columns); c++) {
            //for (var r = startrow; r < Math.min(startrow+rowcheck, rows); r++) {
              var c = startcolumn;
              var r = startrow;

              while(c < Math.min(startcolumn+(columncheck), columns) ){
              r = startrow;
              while(r < Math.min(startrow+(rowcheck), rows) ){

              if (fullPizza[r][c] === 'T') {
                tcount++;
              }
              if (fullPizza[r][c] === 'M') {
                mcount++;
              }
              //if(!flag){
              fullPizza[r][c] = slices.length;
            //}
              //console.log(tcount+":"+mcount);
              if ((parseInt(tcount) >= parseInt(minc)) && (parseInt(mcount) >= parseInt(minc))) {

                flag = true;


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
          storeSlice(startrow, startcolumn, r-1, c-1);
        //  console.log(fullPizza);
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
    }
  }
}

function storeSlice(startr, startc, endr, endc) {
  var slice = [startr + " ", startc + " ", endr + " ", endc + " "];
  //var width = endc-startc;
  //var height = endr-startr;



  slices.push(slice);
}

function writeOutput(slices) {
  console.log(slices.length);
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
