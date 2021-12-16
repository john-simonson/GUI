 /*
    File: scrabble.js
    GUI Assignment: Scrabble
    John Simonson, UMass Lowell Computer Science, john_simonson@student.uml.edu
    Copyright (c) 2021 by John. All rights reserved. May be freely copied or 
    excerpted for educational purposes with credit to the author.
    updated by JS on December 16, 2021 at 4:00 PM
*/

/////////// DATA STRUCTURE from helper file /////////////////////////////////////////////////////////////
/*  File:  /~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Pieces_AssociativeArray_Jesse.js
 *  Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
 *  Copyright (c) 2015 by Jesse M. Heines.  All rights reserved.  May be freely 
 *    copied or excerpted for educational purposes with credit to the author.
 *  updated by JMH on November 21, 2015 at 10:27 AM
 *  updated by JMH on November 25, 2015 at 10:58 AM to add the blank tile
 *  updated by JMH on November 27, 2015 at 10:22 AM to add original-distribution
 */
 
var ScrabbleTiles = [] ;
ScrabbleTiles["A"] = { "value" : 1,  "originalDistribution" : 9,  "numberRemaining" : 9, "letter": 'A'  } ;
ScrabbleTiles["B"] = { "value" : 3,  "originalDistribution" : 2,  "numberRemaining" : 2, "letter": 'B'  } ;
ScrabbleTiles["C"] = { "value" : 3,  "originalDistribution" : 2,  "numberRemaining" : 2, "letter": 'C'  } ;
ScrabbleTiles["D"] = { "value" : 2,  "originalDistribution" : 4,  "numberRemaining" : 4, "letter": 'D'  } ;
ScrabbleTiles["E"] = { "value" : 1,  "originalDistribution" : 12, "numberRemaining" : 12, "letter": 'E' } ;
ScrabbleTiles["F"] = { "value" : 4,  "originalDistribution" : 2,  "numberRemaining" : 2, "letter": 'F'  } ;
ScrabbleTiles["G"] = { "value" : 2,  "originalDistribution" : 3,  "numberRemaining" : 3, "letter": 'G'  } ;
ScrabbleTiles["H"] = { "value" : 4,  "originalDistribution" : 2,  "numberRemaining" : 2, "letter": 'H'  } ;
ScrabbleTiles["I"] = { "value" : 1,  "originalDistribution" : 9,  "numberRemaining" : 9, "letter": 'I'  } ;
ScrabbleTiles["J"] = { "value" : 8,  "originalDistribution" : 1,  "numberRemaining" : 1, "letter": 'J'  } ;
ScrabbleTiles["K"] = { "value" : 5,  "originalDistribution" : 1,  "numberRemaining" : 1, "letter": 'K'  } ;
ScrabbleTiles["L"] = { "value" : 1,  "originalDistribution" : 4,  "numberRemaining" : 4, "letter": 'L'  } ;
ScrabbleTiles["M"] = { "value" : 3,  "originalDistribution" : 2,  "numberRemaining" : 2, "letter": 'M'  } ;
ScrabbleTiles["N"] = { "value" : 1,  "originalDistribution" : 6,  "numberRemaining" : 6, "letter": 'N'  } ;
ScrabbleTiles["O"] = { "value" : 1,  "originalDistribution" : 8,  "numberRemaining" : 8, "letter": 'O'  } ;
ScrabbleTiles["P"] = { "value" : 3,  "originalDistribution" : 2,  "numberRemaining" : 2, "letter": 'P'  } ;
ScrabbleTiles["Q"] = { "value" : 10, "originalDistribution" : 1,  "numberRemaining" : 1, "letter": 'Q'  } ;
ScrabbleTiles["R"] = { "value" : 1,  "originalDistribution" : 6,  "numberRemaining" : 6, "letter": 'R'  } ;
ScrabbleTiles["S"] = { "value" : 1,  "originalDistribution" : 4,  "numberRemaining" : 4, "letter": 'S'  } ;
ScrabbleTiles["T"] = { "value" : 1,  "originalDistribution" : 6,  "numberRemaining" : 6, "letter": 'T'  } ;
ScrabbleTiles["U"] = { "value" : 1,  "originalDistribution" : 4,  "numberRemaining" : 4, "letter": 'U'  } ;
ScrabbleTiles["V"] = { "value" : 4,  "originalDistribution" : 2,  "numberRemaining" : 2, "letter": 'V'  } ;
ScrabbleTiles["W"] = { "value" : 4,  "originalDistribution" : 2,  "numberRemaining" : 2, "letter": 'W'  } ;
ScrabbleTiles["X"] = { "value" : 8,  "originalDistribution" : 1,  "numberRemaining" : 1, "letter": 'X'  } ;
ScrabbleTiles["Y"] = { "value" : 4,  "originalDistribution" : 2,  "numberRemaining" : 2, "letter": 'Y'  } ;
ScrabbleTiles["Z"] = { "value" : 10, "originalDistribution" : 1,  "numberRemaining" : 1, "letter": 'Z'  } ;
ScrabbleTiles["_"] = { "value" : 0,  "originalDistribution" : 2,  "numberRemaining" : 2, "letter": '_'  } ;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

var letterArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "_"]; //array of letters
var letterArray2 = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Blank"]; //array of tile class types
var bonusArray = ["-", "DW", "-", "-", "-", "DW", "-"]; //array for checking word bonuses currently only double word scores are implemented
var boardArray = ["-", "-", "-", "-", "-", "-", "-"]; //array for current state of board
var rackArray = ["-", "-", "-", "-", "-", "-", "-"]; //array for what letters are in rack
var totalScore = 0; //score counter

//initializes board and rack as droppables
function initBoard(){
    //Droppable functions for board slots
    //Needed to make multiple to make the scrabble logic work properly
    $("#1").droppable({
        drop: function(event, ui) { 
            $(this).droppable('option', 'accept', ui.draggable);
            $(this).append(ui);
            var classList = $(ui.draggable).attr('class').split(/\s+/);
            $.each(classList, function(index, item) {
                for(i = 0; i <= letterArray2.length; i++){
                    if (item == letterArray2[i]) {
                        boardArray[0] = item;
                    }
                }
            });
            console.log(boardArray);
            updateWord();
        },
        out: function(event, ui){
            $(this).droppable('option', 'accept', '.tile');
            $(this).remove(ui);
            boardArray[0] = "-";
            console.log(boardArray);
            updateWord();
        },
        snap: true,
        snapMode: "inner"
    });

    $("#2").droppable({
        drop: function(event, ui) { 
            $(this).droppable('option', 'accept', ui.draggable);
            $(this).append(ui);
            var classList = $(ui.draggable).attr('class').split(/\s+/);
            $.each(classList, function(index, item) {
                for(i = 0; i <= letterArray2.length; i++){
                    if (item == letterArray2[i]) {
                        boardArray[1] = item;
                    }
                }
            });
            console.log(boardArray);
            updateWord();
        },
        out: function(event, ui){
            $(this).droppable('option', 'accept', '.tile');
            $(this).remove(ui);
            boardArray[1] = "-";
            console.log(boardArray);
            updateWord();
        },
        snap: true,
        snapMode: "inner"
    });

    $("#3").droppable({
        drop: function(event, ui) { 
            $(this).droppable('option', 'accept', ui.draggable);
            $(this).append(ui);
            var classList = $(ui.draggable).attr('class').split(/\s+/);
            $.each(classList, function(index, item) {
                for(i = 0; i <= letterArray2.length; i++){
                    if (item == letterArray2[i]) {
                        boardArray[2] = item;
                    }
                }
            });
            console.log(boardArray);
            updateWord();
        },
        out: function(event, ui){
            $(this).droppable('option', 'accept', '.tile');
            $(this).remove(ui);
            boardArray[2] = "-";
            console.log(boardArray);
            updateWord();
        },
        snap: true,
        snapMode: "inner"
    });

    $("#4").droppable({
        drop: function(event, ui) { 
            $(this).droppable('option', 'accept', ui.draggable);
            $(this).append(ui);
            var classList = $(ui.draggable).attr('class').split(/\s+/);
            $.each(classList, function(index, item) {
                for(i = 0; i <= letterArray2.length; i++){
                    if (item == letterArray2[i]) {
                        boardArray[3] = item;
                    }
                }
            });
            console.log(boardArray);
            updateWord();
        },
        out: function(event, ui){
            $(this).droppable('option', 'accept', '.tile');
            $(this).remove(ui);
            boardArray[3] = "-";
            console.log(boardArray);
            updateWord();
        },
        snap: true,
        snapMode: "inner"
    });

    $("#5").droppable({
        drop: function(event, ui) { 
            $(this).droppable('option', 'accept', ui.draggable);
            $(this).append(ui);
            var classList = $(ui.draggable).attr('class').split(/\s+/);
            $.each(classList, function(index, item) {
                for(i = 0; i <= letterArray2.length; i++){
                    if (item == letterArray2[i]) {
                        boardArray[4] = item;
                    }
                }
            });
            console.log(boardArray);
            updateWord();
        },
        out: function(event, ui){
            $(this).droppable('option', 'accept', '.tile');
            $(this).remove(ui);
            boardArray[4] = "-";
            console.log(boardArray);
            updateWord();
        },
        snap: true,
        snapMode: "inner"
    });

    $("#6").droppable({
        drop: function(event, ui) { 
            $(this).droppable('option', 'accept', ui.draggable);
            $(this).append(ui);
            var classList = $(ui.draggable).attr('class').split(/\s+/);
            $.each(classList, function(index, item) {
                for(i = 0; i <= letterArray2.length; i++){
                    if (item == letterArray2[i]) {
                        boardArray[5] = item;
                    }
                }
            });
            console.log(boardArray);
            updateWord();
        },
        out: function(event, ui){
            $(this).droppable('option', 'accept', '.tile');
            $(this).remove(ui);
            boardArray[5] = "-";
            console.log(boardArray);
            updateWord();
        },
        snap: true,
        snapMode: "inner"
    });

    $("#7").droppable({
        drop: function(event, ui) { 
            $(this).droppable('option', 'accept', ui.draggable);
            $(this).append(ui);
            var classList = $(ui.draggable).attr('class').split(/\s+/);
            $.each(classList, function(index, item) {
                for(i = 0; i <= letterArray2.length; i++){
                    if (item == letterArray2[i]) {
                        boardArray[6] = item;
                    }
                }
            });
            console.log(boardArray);
            updateWord();
        },
        out: function(event, ui){
            $(this).droppable('option', 'accept', '.tile');
            $(this).remove(ui);
            boardArray[6] = "-";
            console.log(boardArray);
            updateWord();
        },
        snap: true,
        snapMode: "inner"
    });
    console.log("after droppable")
}

//fills users rack
//will load remaining tiles before pulling new tiles from bag
function loadRack(arr){
    //reset tile rack
    $("#tileRack").html('<tbody><tr><td class="ui-droppable"></td><td class="ui-droppable"></td><td class="ui-droppable"></td><td class="ui-droppable"></td><td class="ui-droppable"></td><td class="ui-droppable"></td><td class="ui-droppable"></td></tr></tbody>');
    //initialize tile rack after reset
    $("#tileRack td").droppable({
        drop: function(event, ui) { //when tile is added
            $(this).droppable('option', 'accept', ui.draggable);
            $(this).append(ui);
            ui.draggable.addClass("OnRack");
        },
        out: function(event, ui){ //when tile is removed
            $(this).droppable('option', 'accept', '.tile');
            $(this).remove(ui);
            ui.draggable.removeClass("OnRack");
        },
        snap: true,
        snapMode: "both"
    });
    //allow board slots to be droppable
    $("#1").droppable('option', 'accept', '.tile'); 
    $("#2").droppable('option', 'accept', '.tile');
    $("#3").droppable('option', 'accept', '.tile');
    $("#4").droppable('option', 'accept', '.tile');
    $("#5").droppable('option', 'accept', '.tile');
    $("#6").droppable('option', 'accept', '.tile');
    $("#7").droppable('option', 'accept', '.tile');
    boardArray = ["-", "-", "-", "-", "-", "-", "-"]; //reset board array
    if(arr.length > 0){
        for(i = 0 ; i < arr.length ; i++){
            var randTile = ScrabbleTiles[arr[i]];
            rackArray[i] = arr[i];
            if(arr[i] == '_'){
                arr[i] = 'Blank';
            }
            var Tile = "<div class='tile " + arr[i] +"'><img src='Scrabble_Tiles/Scrabble_Tile_" + arr[i] + ".jpg'>" + "</div>";
            $("#tileRack td:nth-child(" + (i + 1) + ")").append(Tile);
        }
    }
    for(i = arr.length ; i < 7; i++){
        var num = randInt();
        var randLetter = letterArray[num];
        var randTile = ScrabbleTiles[randLetter];
        //console.log(randLetter);
        //console.log(randTile);
        randTile.numberRemaining--;
        if(randLetter == '_'){
            randLetter = 'Blank';
        }
        rackArray[i] = randLetter;
        var Tile = "<div class='tile " + randLetter +"'><img src='Scrabble_Tiles/Scrabble_Tile_" + randLetter + ".jpg'>" + "</div>";
        //console.log(Tile);
        $("#tileRack td:nth-child(" + (i + 1) + ")").append(Tile);
    }
    $(".tile").draggable({
        revert: "invalid",
        snap: true,
        grid: [1, 7]
    });
    console.log(rackArray);
    outputTiles();
}

//returns a random int for generating random tiles
function randInt(){
    return Math.floor(Math.random() * letterArray.length);
}

//on start
$(function(){
    //console.log(dictionary);
    var arr = []
    //console.log("In Ready");
    init(arr); //call init to start game
});

//output table to show tile bag contents
function outputTiles(){
    $("#tilesLeft").html("");
    var content = "<table class='table'><th>Letter</th><th>Value</th><th>Tiles Left</th>"
    for(i = 0; i < letterArray.length; i++){
        content += "<tr><td>" + letterArray[i] + "</td><td>" + ScrabbleTiles[letterArray[i]].value + "</td><td>" + ScrabbleTiles[letterArray[i]].numberRemaining + "</td></tr>"; 
    }
    content += "</table>";
    $("#tilesLeft").append(content);
}

//submit function
function submitWord(){
    var arr = []
    let flag = isWordValid();
    if(flag == true){
        let newScore = setScore(); //compute score of word
        $("#wordScore").text("Word Score: " + newScore); //write word score
        $("#totalScore").text("Total Score: " + totalScore); //write total score
        arr = getNewRack(); //get current rack tiles
        init(arr); //generate new rack
    }
    else{
        alert("invalid word") //if user tries to submit an invalid word
    }
}

//board and rack initialization and reset
function init(arr){
    outputTiles(); //show current status of the tile bag
    initBoard(); //initialize board to be droppable
    loadRack(arr); //load tiles into rack
}

//updates the word display
function updateWord(){
    let flag = isWordValid();
    if(flag == false){ //set color of text to red if invalid
        $("#currentWord").css({
            "color": "red"
        });
    }
    else{ //set to green if valid
        $("#currentWord").css({
            "color": "green"
        });
    }
    $("#currentWord").text("");
    var content = "Word: "
    for(i = 0; i < 7; i++){
        content += boardArray[i];
    }
    $("#currentWord").append(content); //append current board status to page
}

//validates word
function isWordValid(){
    var start = false;
    var end = false;
    //check if word is in dictionary if true check to see if tile configuration is valid
    if(checkDictionary() == false){
        return false
    }
    else{
        for(i=0; i<7; i++){
            if(start == true && end == true && boardArray[i] != '-'){
                return false;
            }
            if(start == true && boardArray[i] == '-'){
                end = true;
            }
            if(boardArray[i] != '-'){
                start = true;
            }
        }
        if(end == false){
            return false;
        }
        else{
            return true;
        }
    }
}

//computes the score after word is submitted
function setScore(){
    var score = 0;
    var tmp;
    var DW_Flag = 0;
    for(i = 0; i < 7; i++){
        if(boardArray[i] != '-'){
            tmp = boardArray[i];
            if(tmp == "Blank"){ //parse blanks
                tmp = '_';
            }
            if(bonusArray[i] == 'DW'){ //check 
                score += ScrabbleTiles[tmp].value;
                DW_Flag++;
            }
            else{
                score += ScrabbleTiles[tmp].value;
            }
        }
    }
    while(DW_Flag > 0){ //check for double word score
        score *= 2;
        DW_Flag--;
    }
    totalScore += score; //add word score to total
    return score;
}

//Determines what tiles are left in the rack
function getNewRack(){
    var arr = [];
    var match_bool = false;
    for(i=0; i < 7 ; i++){
        for(j = 0 ; j < 7 ; j++){
            if(boardArray[j] == rackArray[i]){
                match_bool = true; //match found
                boardArray[j] = '-'; //set to - to avoid false positives for duplicate letters still in rack
            }
        }
        if(match_bool == false){
            arr.push(rackArray[i]); //push unspent tiles into array
        }
        match_bool = false;
    }
    console.log(arr);
    return arr; //return unspent tiles
}

//game reset
function gameReset(){
    let arr = []
    for(i = 0; i < 27; i++){ //reset tile bag to original state
        ScrabbleTiles[letterArray[i]].numberRemaining = ScrabbleTiles[letterArray[i]].originalDistribution;
    }
    //reset score and word displays
    totalScore = 0;
    $("#currentWord").text("");
    $("#wordScore").text("");
    $("#totalScore").text("");
    init(arr);
}

//checks if word is in dictionary
function checkDictionary(){
    var boardString = parse_boardArray(); //converts board to string
    return dictionary.includes(boardString); //returns true if word is found
}

//turns board array into lower case string
function parse_boardArray(){
    var str = "";
    for(i = 0; i < 7; i++){
        if(boardArray[i] != '-'){
            str += boardArray[i]
        }
    }
    console.log(str);
    return str.toLowerCase();
}
