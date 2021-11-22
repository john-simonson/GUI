 /*
    File: script.js
    GUI Assignment: Multiplication Table part 2
    John Simonson, UMass Lowell Computer Science, john_simonson@student.uml.edu
    Copyright (c) 2021 by John. All rights reserved. May be freely copied or 
    excerpted for educational purposes with credit to the author.
    updated by JS on November 21, 2021 at 6:00 PM
*/

//tab counter
var cnt = 0;

$(function(){
  //found method at: https://stackoverflow.com/questions/32587177/jquery-validate-compare-two-fields/51589538
  $.validator.addMethod('le', function (value, element, param) {
    return this.optional(element) || parseInt(value) <= parseInt($(param).val());
}, 'Invalid value');
//validator
  $("#tableForm").validate({
    //validation rules
    rules: {
      x_high: {
        required: true,
        number: true,
        min: -50,
        max: 50
      },
      x_low: {
        required: true,
        number: true,
        min: -50,
        max: 50,
        le: '#x_high'
      },
      y_high: {
        required: true,
        number: true,
        min: -50,
        max: 50
      },
      y_low: {
        required: true,
        number: true,
        min: -50,
        max: 50,
        le: '#y_high'
      }
    },

    //custom error messages
    messages: {
      x_high: {
        required: "<p> Error! No value entered for x upper bound. Please enter a number between -50 and 50. </p>",
        number: "<p> Error! Input is not a number. Please enter a number between -50 and 50. </p>",
        min: "<p> Error! Input is less than -50. Please enter a number between -50 and 50. </p>",
        max: "<p> Error! Input is more than 50. Please enter a number between -50 and 50. </p>"
      },
      x_low: {
        required: "<p> Error! No value entered for x lower bound. Please enter a number between -50 and 50. </p>",
        number: "<p> Error! Input is not a number. Please enter a number between -50 and 50. </p>",
        min: "<p> Error! Input is less than -50. Please enter a number between -50 and 50. </p>",
        max: "<p> Error! Input is more than 50. Please enter a number between -50 and 50. </p>",
        le: "<p> Error! Lower bound is higher than Upper Bound. </p>"
      },
      y_high: {
        required: "<p> Error! No value entered for y upper bound. Please enter a number between -50 and 50. </p>",
        number: "<p> Error! Input is not a number. Please enter a number between -50 and 50. </p>",
        min: "<p> Error! Input is less than -50. Please enter a number between -50 and 50. </p>",
        max: "<p> Error! Input is more than 50. Please enter a number between -50 and 50. </p>"
      },
      y_low: {
        required: "<p> Error! No value entered for y lower bound. Please enter a number between -50 and 50. </p>",
        number: "<p> Error! Input is not a number. Please enter a number between -50 and 50. </p>",
        min: "<p> Error! Input is less than -50. Please enter a number between -50 and 50. </p>",
        max: "<p> Error! Input is more than 50. Please enter a number between -50 and 50. </p>",
        le: "<p> Error! Lower bound is higher than Upper Bound. </p>"
      }
    },

    submitHandler: function() {
      //generate the table
      addTable();
      //add table to a new tab
      createTab();
    }
  });

  //sliders
  $("#slider_x_high").slider({
    min: -50,
    max: 50,
    value: 0,
    //apply value to form
    change: function(event, ui){
      $('input#x_high').val(ui.value);
    }
  });

  $("#slider_x_low").slider({
    min: -50,
    max: 50,
    value: 0,
    //apply value to form
    change: function(event, ui){
      $('input#x_low').val(ui.value);
    }
  });

  $("#slider_y_high").slider({
    min: -50,
    max: 50,
    value: 0,
    //apply value to form
    change: function(event, ui){
      $('input#y_high').val(ui.value);
    }
  });

  $("#slider_y_low").slider({
    min: -50,
    max: 50,
    value: 0,
    //apply value to form
    change: function(event, ui){
      $('input#y_low').val(ui.value);
    }
  });
});


//Found and modified function from: https://www.c-sharpcorner.com/article/dynamic-jquery-tabs-add-update-delete-and-sorting/
$("#removeTabs").click(function () {  
      // Find name of Tab by attribute id  
      var tabIndex = $("#tabs .ui-tabs-panel:visible").attr("id");  

      // Removing Li and as well as content Div for the specific Tab  
      $("#tabs").find(".ui-tabs-nav li a[href='#" + tabIndex + "']").parent().remove();  
      $("#tabs").find("div[id=" + tabIndex + "]").remove();  

      // One removing process done we refresh the tab again  
      $("#tabs").tabs("refresh");  
    cnt--; //decrement counter
});  

$("#removeAll").click(function () { 
  while(cnt > 0){ //while there are tabs delete current tab
  var tabIndex = $("#tabs .ui-tabs-panel:visible").attr("id");  

      // Removing Li and as well as content Div for the specific Tab  
      $("#tabs").find(".ui-tabs-nav li a[href='#" + tabIndex + "']").parent().remove();  
      $("#tabs").find("div[id=" + tabIndex + "]").remove();  

      // One removing process done we refresh the tab again  
      $("#tabs").tabs("refresh");  
      cnt--; //decrement counter
  }
});

function createTab(){
  $("#tabs").tabs();

  //get form values
  let x_high = $('#x_high').val();
  let x_low = $('#x_low').val();
  let y_high = $('#y_high').val();
  let y_low = $('#y_low').val(); 

  //increment counter
  cnt++;

  //add link to tab list
  $("#tabs ul").append("<li><a href='#tab-" + cnt + "'>" + cnt + "</li>");

  //add table to tab body
  $("#tabs").append("<div id='tab-" + cnt + "'>" + $("#Tab").html() + "</div>");

  //refresh the tabs
  $("#tabs").tabs("refresh");

  //make new tab active
  $( "#tabs" ).tabs({ active: -1 });

  //wipe table div after copy
  $('#Tab').html(" ");
}

function addTable(){
  //wipe div if not empty
  $('#Tab').html(" ");
  //get values
  let x_high = $('#x_high').val();
  let x_low = $('#x_low').val();
  let y_high = $('#y_high').val();
  let y_low = $('#y_low').val(); 

  //temp variable
  var y_tmp = y_low;
  //create table
  var content = "<table><tr><th>" + " " + "</th>"
  //add top header
  for(k=x_low; k <= x_high; k++){
    content += "<th>" + k +"</th>";
  }
  //table body
  for (i=y_low; i <= y_high; ++i){
    //side header
    content += "<tr><th>" + y_tmp + "</th>";
    ++y_tmp //increment temp var
    //main table body generation
    for (j=x_low; j <= x_high; ++j){
      content += '<td>' + i*j + '</td>';
    }
    //add end tag for table row
    content += "</tr>"
  }
  // add end tag for table
  content += "</table>"

  //set attributes
  $('#Tab').attr("class", "table table-wrapper table-hover table-responsive container col-md-6")
  //put table in div
  $('#Tab').append(content);
}

function load() {
  console.log("Page load finished");
}