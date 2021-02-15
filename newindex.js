/**
 * @Author: John Isaacs <john>
 * @Date:   06-Feb-172017
 * @Filename: index.js

* @Last modified by:   john
* @Last modified time: 18-Feb-172017
*/


var pizzano = 0;
var teams2 = 0; //parseInt(rows)-1;
var teams3 = 0;
var teams4 = 0;
var pizzas = [];
var lineNo = 0;
var startColumn = 0;
var cellcount = 0;
var currenttop = 0
var currentbottom = 0;

var firstline = true;
var results = [];

var fs = require('fs')
// again
process.argv.forEach(function (val, index, array) {
    filename = val;

});

var cycle =0;

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

    //console.log(pizzas);
    currentbottom = pizzas.length - 1;
    
    
    var fp = quickSolutionRandom();
     //fp = quickSolutionRandom();
     //fp = quickSolutionRandom();
     //fp = quickSolutionRandom();
    var firstPhenotype = {
        result:fp
        // enter phenotype data here
    }
    //console.log(pizzas);
    //writeOutput(results);

    var config = {
        mutationFunction: mutationFunction,
        //crossoverFunction: crossoverFunction,
        fitnessFunction: fitnessFunction,
        population: [firstPhenotype]
        
    }
    var GeneticAlgorithmConstructor = require('geneticalgorithm')
    var geneticalgorithm = GeneticAlgorithmConstructor( config )

    
    console.log("Starting with:")
    console.log( firstPhenotype )
    for( var i = 0 ; i < 100 ; i++ ) geneticalgorithm.evolve()
    var best = geneticalgorithm.best()
    delete best.score
    console.log("Finished with:")
    console.log(best)
    writeOutput(best);
});

function processPizzaLine(line) {
    if (firstline) {
        firstline = false;
        pizzano = parseInt(line.split(" ")[0]);
        teams2 = parseInt(line.split(" ")[1]);
        teams3 = parseInt(line.split(" ")[2]);
        teams4 = parseInt(line.split(" ")[3]);
        console.log("pizza-no: " + pizzano + " two teams: " + teams2 + " three teams: " + teams3 + " four teams: " + teams4);
    } else {
        var pizza = [];
        var pizzaline = line.split(" ")[0]
        for (var c = 1; c <= line.split(" ")[0]; c++) {
            pizza.push(line.split(" ")[c]);
        }
        //fullPizza.push(row);
        pizzas.push([lineNo, pizza]);
        lineNo++;

    }
}


function quickSolution() {

    var pizzacount = pizzano;


    pizzas.sort(sortFunction);

    for (var x = 0; x < teams2; x++) {
        pizzano -= 2;
        if (pizzano >= 0) {
            results.push([2, pizzas[currenttop++][0], pizzas[currentbottom--][0]]);
            //console.log(pizzano+":"+currenttop+":"+currentbottom);
        }
    }
    for (var x = 0; x < teams3; x++) {
        pizzano -= 3;
        if (pizzano >= 0) {
            results.push([3, pizzas[currenttop++][0], pizzas[currentbottom--][0], pizzas[currenttop++][0]]);
            //console.log(pizzano+":"+currenttop+":"+currentbottom);
        }
    }
    for (var x = 0; x < teams4; x++) {
        pizzano -= 4;
        if (pizzano >= 0) {
            results.push([4, pizzas[currenttop++][0], pizzas[currentbottom--][0], pizzas[currenttop++][0], pizzas[currentbottom--][0]]);
            //console.log(pizzano+":"+currenttop+":"+currentbottom);
        }
    }

}
var team2no = 0;
var team3no = 0;
var team4no = 0;
var pizzacount = 0;

function quickSolutionRandom() {
    console.log(cycle++);
    team2no = 0;
    team3no = 0;
    team4no = 0;

    pizzacount = pizzano;
    currenttop =0;
    currentbottom = pizzas.length-1;


    pizzas.sort(sortFunction);


    

var res = [];
    while (pizzacount > 1) {
        //console.log(pizzacount);
        var random = Math.floor(Math.random() * 3);
        //console.log(random);
        switch (random) {
            case 0: team2(res); break;
            case 1: team3(res); break;
            case 2: team4(res); break;
        }
        //console.log(res);
    }
    return res;

}


function team2(res) {
    
    var t = pizzacount-2;
    if (t >= 0 && team2no < teams2) {
        //console.log(pizzano+":"+currenttop+":"+currentbottom);
        res.push([2, pizzas[currenttop++][0], pizzas[currentbottom--][0]]);
        //console.log(pizzano+":"+currenttop+":"+currentbottom);
        pizzacount -=2;
        team2no++;
    }
    

}
function team3(res) {
    var t = pizzacount-3;
    if (t >= 0 && team3no < teams3) {
        //console.log(pizzano+":"+currenttop+":"+currentbottom);
        res.push([3, pizzas[currenttop++][0], pizzas[currentbottom--][0], pizzas[currenttop++][0]]);
        //console.log(pizzano+":"+currenttop+":"+currentbottom);
        pizzacount -=3;
        team3no++;
    }
    
}
function team4(res) {
    var t = pizzacount-4;
    if (t >= 0 && team4no < teams4) {
        //console.log(pizzano+":"+currenttop+":"+currentbottom);
        res.push([4, pizzas[currenttop++][0], pizzas[currentbottom--][0], pizzas[currenttop++][0], pizzas[currentbottom--][0]]);
        //console.log(pizzano+":"+currenttop+":"+currentbottom);
        pizzacount -=4;
        team4no++;
    }
    
}



function quickSolutionQ() {

    var pizzacount = pizzano;


    pizzas.sort(sortFunction);
    for (var x = 0; x < teams2; x++) {
        pizzano -= 2;
        if (pizzano >= 0) {


            var a1idx = currenttop++;
            var array1 = pizzas[a1idx];

            var a2idx = currentbottom;
            var array2 = [];

            var found = false;

            while (!found && a1idx < a2idx) {
                array2 = pizzas[ca2idx--];
                containsFunction(array1, array2);
            }
            if (found) {
                results.push([2, pizzas[a1idx][0], pizzas[a2idx][0]]);
                pizzas.slice[a1idx];
                pizzas.slice[a2idx];
                currenttop = 0;
                currentbottom = pizzas.length;

            }
            //console.log(pizzano+":"+currenttop+":"+currentbottom);
        }
    }
    for (var x = 0; x < teams3; x++) {
        pizzano -= 3;
        if (pizzano >= 0) {
            var a1idx = currenttop++;
            var array1 = pizzas[a1idx];

            var a2idx = currentbottom;
            var array2 = [];

            var a3idx = currenttop + 1;
            var array3 = [];

            var found = false;

            while (!found && a2idx < a2idx) {
                array2 = pizzas[a2idx--];
                containsFunction(array1, array2);
            }
            found = false;
            while (!found && a3idx < currentbottom) {
                if (a2idx != a3idx) {
                    array3 = pizzas[a3idx++];
                    containsFunction(array1, array2);
                }
            }
            if (found) {
                results.push([2, pizzas[a1idx][0], pizzas[a2idx][0]]);
                pizzas.slice[a1idx];
                pizzas.slice[a2idx];
                currenttop = 0;
                currentbottom = pizzas.length;

            }
            results.push([3, pizzas[currenttop++][0], pizzas[currentbottom--][0], pizzas[currenttop++][0]]);
            //console.log(pizzano+":"+currenttop+":"+currentbottom);
        }
    }
    for (var x = 0; x < teams4; x++) {
        pizzano -= 4;
        if (pizzano >= 0) {
            results.push([4, pizzas[currenttop++][0], pizzas[currentbottom--][0], pizzas[currenttop++][0], pizzas[currentbottom--][0]]);
            //console.log(pizzano+":"+currenttop+":"+currentbottom);
        }
    }

}

function containsFunction(array1, array2) {
    var found = array1.some(r => array2.includes(r));
    return found;
}



function sortFunction(a, b) {
    if (a[1].length === b[1].length) {
        return 0;
    }
    else {
        return (a[1].length < b[1].length) ? -1 : 1;
    }
}

function goingDown() {
    while (cellcount < cells) {
        if (fullPizza[row][column] === 'T') {
            tcount++;
        }
        if (fullPizza[row][column] === 'M') {
            mcount++;
        }
        checkSlice();
        cellcount++;
        row++;
        if (row >= rows) {
            break;
        }
    }
    switchDir("down");
}
function goingUp() {
    while (cellcount < cells) {
        if (fullPizza[row][column] === 'T') {
            tcount++;
        }
        if (fullPizza[row][column] === 'M') {
            mcount++;
        }
        checkSlice();
        cellcount++;
        row--;
        if (row <= 0) {
            break;
        }
    }

    switchDir("up");
}
function switchDir(dir) {
    column++;
    if (dir === "up") {
        goingDown();
    }
    else {
        goingUp();
    }

    slices.push(slice);
}
function checkSlice() {
    if (cellcount > cells) {
        cellcount = 0;
        startRow = row + 1;
        startColumn = column + 1;
    }
    if ((parseInt(tcount) >= parseInt(minc)) && (parseInt(mcount) >= parseInt(minc))) {
        console.log(tcount + ":" + mcount + ":" + minc);
        storeSlice(startRow, startColumn, row, column);
        startRow = row + 1;
        startColumn = column + 1;
        cellcount = 0;
    }
}
function storeSlice(startRow, startColumn, endRow, endColumn) {
    var slice = [startRow + " ", startColumn + " ", endRow + " ", endColumn + " "];
    slices.push(slice);
}
//console.log(slices);




function writeOutput(results) {

    var logger = fs.createWriteStream(filename + ".out", {
        flags: 'a' // 'a' means appending (old data will be preserved)
    });

    logger.write(results.length.toString()); // append string to your file

    logger.write("\n");
    for (var i = 0; i < results.length; i++) {
        var str = results[i].toString();
        //console.log(str);
        str = str.replace(/,/g, ' ');
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


function mutationFunction(phenotype) {
    // make a random change to phenotype
    
    phenotype=quickSolutionRandom();
    //console.log(phenotype)
    	return phenotype
}

function crossoverFunction(phenotypeA, phenotypeB) {
	// move, copy, or append some values from a to b and from b to a
	return [ phenotypeA , phenotypeB ]
}

function fitnessFunction(phenotype) {
	var score = 0
    // use your phenotype data to figure out a fitness score
    //console.log(phenotype);
    score = phenotype.length
    //console.log(score)
	return score
}




