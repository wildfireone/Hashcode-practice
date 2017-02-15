/**
* @Author: John Isaacs <john>
* @Date:   06-Feb-172017
* @Filename: index.js
* @Last modified by:   john
* @Last modified time: 09-Feb-172017
*/
var rows, columns, minc, cells;
var firstline = true;
var fullpizza = [];
var slices = [];
var filename;
var lineNo=0;

var fs = require('fs')
 // again
process.argv.forEach(function (val, index, array) {
  filename = val;
});


var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader(filename);

lr.on('error', function (err) {
console.log(error);
	// 'err' contains error object
});

lr.on('line', function (line) {
  processPizzaLine(line);
	// 'line' contains the current line without the trailing newline character.
});

lr.on('end', function () {
	// All lines are read, file is closed now.
  //console.log(fullpizza);
  quickSolution(fullpizza);

  writeOutput(slices);
});

function processPizzaLine(line)
{
  if(firstline){
    firstline = false;
    rows = parseInt(line.split(" ")[0]);
    columns = parseInt(line.split(" ")[1]);
    minc = parseInt(line.split(" ")[2]);
    cells = parseInt(line.split(" ")[3]);
    console.log("rows: "+rows+" columns: "+columns+" minimum item: "+minc+" max cells: "+cells);
  }
  else{
    var row = [];
    for (var c=0; c<columns;c++){
      row.push(line[c]);
    }
    fullpizza.push(row);
    lineNo++;
  }
}

function quickSolution(fullPizza){
  var column =0;
  var row = 0;
  while(column<parseInt(columns) && row<parseInt(rows)){
  //for(column =0 ; column<columns; column=(column+(cells/2))){
  //  for(row =0 ; row<rows; row=(row+(cells/2))){
        var currentSlice=[];
        var tcount =0;
        var mcount =0;
        var slice = [row+" ", column+" ", (Math.min(row+(cells-1),rows-1))+" ", column+" "];
        var flag = false;

        for(var r =row; r<Math.min(row+(cells/2), rows); r++){
          for(var c=column; c<Math.min(column+(cells/2), columns); c++){
          //if(currentSlice.indexOf(fullPizza[r][column])>-1)
          //{
            //this igredient alread exists
          //}
          //else{
          //  currentSlice.push(fullPizza[r][column]);
          //}

          //if(currentSlice.length>min){
          //  flag = true;
          //}
          if(fullPizza[r][c]==='T'){tcount++;}
          if(fullPizza[r][c]==='M'){mcount++;}
          if((parseInt(tcount)>=parseInt(minc))&&(parseInt(mcount)>=parseInt(minc))){
            console.log(tcount +":"+mcount+":"+minc);
            flag = true;
            //console.log(flag);

            break;


          }
          row = row +r;
          column = column+c;
        }
      }
        if(flag){
          slices.push(slice);
        }



    //}
  //}

}
  //console.log(slices);


}

function writeOutput(slices){
  var logger = fs.createWriteStream(filename+".out", {
    flags: 'a' // 'a' means appending (old data will be preserved)
  });

  logger.write(slices.length.toString().trim()); // append string to your file
  logger.write("\n");
  for(var i=0; i<slices.length;i++){
    var str = slices[i].toString();
    str = str.replace(/,/g ,'');
    logger.write(str.trim());
    logger.write("\n");
  }
  logger.end();
}

// function checkNeighbourhood(var thisPosX, var thisPosY, var current){
//   int startPosX = thisPosX;
//   int startPosY = thisPosY;
//   int endPosX =   (thisPosX + 1 > rows) ? thisPosX : thisPosX+1;
//   int endPosY =   (thisPosY + 1 > columns) ? thisPosY : thisPosY+1;
//   // See how many are alive
//   for (int rowNum=startPosX; rowNum<=endPosX; rowNum++) {
//       for (int colNum=startPosY; colNum<=endPosY; colNum++) {
//         // All the neighbors will be grid[rowNum][colNum]
//         return current == fullPizza[rowNum][colNum];
//       }
//     }
// }
