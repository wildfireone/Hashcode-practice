/**
 * @Author: John Isaacs <john>
 * @Date:   06-Feb-172017
 * @Filename: index.js
<<<<<<< HEAD
 * @Last modified by:   john
 * @Last modified time: 17-Feb-172017
=======
* @Last modified by:   john
* @Last modified time: 18-Feb-172017
>>>>>>> 285ee0a64949b4eb31a3294190f07ca0e2804a37
 */
var rows, columns, minc, cells;
var firstline = true;
var fullPizza = [];
var slices = [];
var filename;
var lineNo = 0;
<<<<<<< HEAD

var fs = require('fs')
// again
process.argv.forEach(function(val, index, array) {
  filename = val;
=======
var column = 0;
var row = 0; //parseInt(rows)-1;
var tcount = 0;
var mcount = 0;
var startRow =0;
var startColumn =0;
var cellcount =0;


var fs = require('fs')
    // again
process.argv.forEach(function(val, index, array) {
    filename = val;
>>>>>>> 285ee0a64949b4eb31a3294190f07ca0e2804a37
});


var LineByLineReader = require('line-by-line'),
  lr = new LineByLineReader(filename);

lr.on('error', function(err) {
<<<<<<< HEAD
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
=======
    console.log(error);
    // 'err' contains error object
});

lr.on('line', function(line) {
    processPizzaLine(line);
    // 'line' contains the current line without the trailing newline character.
});

lr.on('end', function() {
    // All lines are read, file is closed now.
    console.log(fullPizza);
    quickSolution();

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
        fullPizza.push(row);
        lineNo++;
>>>>>>> 285ee0a64949b4eb31a3294190f07ca0e2804a37
    }
}

<<<<<<< HEAD
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
      var rowcheck = 1;
      var columncheck = 1;

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

              while(c < Math.min(startcolumn+(minc), columns)&&!bust){
              r = startrow;
              while(r < Math.min(startrow+(minc), rows)&&!bust){

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
          storeSlice(fullPizza,startrow, startcolumn, r, c);
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

function storeSlice(fullPizza,startr, startc, endr, endc) {
  var slice = [startr + " ", startc + " ", endr + " ", endc + " "];
  //var width = endc-startc;
  //var height = endr-startr;
  //for(var x = startc; x<endc;x++){
  //  for(var y = startr; y<endr;y++){
  //      fullPizza[y][x] = slices.length;
  //  }
  //}

=======
function quickSolution() {


        goingDown();

}

function goingDown(){
  while (cellcount < cells  ) {
    if (fullPizza[row][column] === 'T') {
        tcount++;
    }
    if (fullPizza[row][column] === 'M') {
        mcount++;
    }
    checkSlice();
    cellcount++;
    row++;
    if(row>=rows){
      break;
    }
  }
  switchDir("down");
}
function goingUp(){
  while (cellcount < cells ) {
    if (fullPizza[row][column] === 'T') {
        tcount++;
    }
    if (fullPizza[row][column] === 'M') {
        mcount++;
    }
    checkSlice();
    cellcount++;
    row--;
    if(row<=0){
      break;
    }
  }
>>>>>>> 285ee0a64949b4eb31a3294190f07ca0e2804a37

  switchDir("up");
}
function switchDir(dir){
  column++;
  if(dir === "up"){
    goingDown();
  }
  else{
    goingUp();
  }

  slices.push(slice);
}
function checkSlice(){
  if(cellcount>cells){
    cellcount =0 ;
    startRow = row+1;
    startColumn = column+1;
  }
  if ((parseInt(tcount) >= parseInt(minc)) && (parseInt(mcount) >= parseInt(minc))) {
      console.log(tcount + ":" + mcount + ":" + minc);
      storeSlice(startRow, startColumn, row, column);
      startRow = row+1;
      startColumn = column+1;
      cellcount =0;
  }
}
function storeSlice(startRow, startColumn, endRow, endColumn){
  var slice = [startRow + " ", startColumn + " ", endRow+ " ", endColumn + " "];
  slices.push(slice);
}
//console.log(slices);




function writeOutput(slices) {
<<<<<<< HEAD
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
=======
    var logger = fs.createWriteStream(filename + ".out", {
        flags: 'a' // 'a' means appending (old data will be preserved)
    });

    logger.write(slices.length.toString().trim()); // append string to your file
>>>>>>> 285ee0a64949b4eb31a3294190f07ca0e2804a37
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
