 /*
    File: script.js
    GUI Assignment: Multiplication Table
    John Simonson, UMass Lowell Computer Science, john_simonson@student.uml.edu
    Copyright (c) 2021 by John. All rights reserved. May be freely copied or 
    excerpted for educational purposes with credit to the author.
    updated by JS on October 26, 2021 at 6:00 PM
*/
      function addTable() {
        //get table div
        var myTableDiv = document.getElementById("Tab");
        myTableDiv.setAttribute('class', 'table-wrapper');
        //clear old table
        myTableDiv.innerHTML="";
          
        //generate table
        var table = document.createElement('TABLE');
        table.border='1';
        table.setAttribute('class', 'table table-hover table-responsive container col-md-6');
        table.setAttribute('id', 'tableID');

        //create tbody element
        var tableBody = document.createElement('TBODY');
        table.appendChild(tableBody);

        //get user inputs
        let x_high = document.getElementById("x_high").value;
        let x_low = document.getElementById("x_low").value;
        let y_high = document.getElementById("y_high").value;
        let y_low = document.getElementById("y_low").value;

        //Error Check Improper Bounds
        if(x_low > x_high || y_low > y_high){
          document.getElementById("alert_placeholder").textContent = "Error!: Improper Bounds. (Upper Bound must be greater than lower bound.)";
          document.getElementById("alert_placeholder").setAttribute('class', 'alert alert-danger');
          return;
        }
        //Error Check Min and Max Values
        if(x_high < -50 || x_high > 50){
          document.getElementById("alert_placeholder").textContent = "Error!: X Upper Bound not between -50 and 50";
          document.getElementById("alert_placeholder").setAttribute('class', 'alert alert-danger');
          return;
        }
        //Error Check Non Integer
       if(!((x_high%1)===0)){
          document.getElementById("alert_placeholder").textContent = "Error!: X Upper Bound not an integer";
          document.getElementById("alert_placeholder").setAttribute('class', 'alert alert-danger');
          return;
        } 
        //Error Check Min and Max Values
        if(x_low < -50 || x_low > 50){
          document.getElementById("alert_placeholder").textContent = "Error!: X Lower Bound not between -50 and 50";
          document.getElementById("alert_placeholder").setAttribute('class', 'alert alert-danger');
          return;
        }
        //Error Check Non Integer
       if(!((x_low%1)===0)){
          document.getElementById("alert_placeholder").textContent = "Error!: X Lower Bound not an integer";
          document.getElementById("alert_placeholder").setAttribute('class', 'alert alert-danger');
          return;
        } 
        //Error Check Min and Max Values
        if(y_high < -50 || y_high > 50){
          document.getElementById("alert_placeholder").textContent = "Error!: Y Upper Bound not between -50 and 50";
          document.getElementById("alert_placeholder").setAttribute('class', 'alert alert-danger');
          return;
        }
        //Error Check Non Integer
        if(!((y_high%1)===0)){
          document.getElementById("alert_placeholder").textContent = "Error!: Y Upper Bound not an integer";
          document.getElementById("alert_placeholder").setAttribute('class', 'alert alert-danger');
          return;
        }
        //Error Check Min and Max Values
        if(y_low < -50 || y_low > 50){
          document.getElementById("alert_placeholder").textContent = "Error!: Y Lower Bound not between -50 and 50";
          document.getElementById("alert_placeholder").setAttribute('class', 'alert alert-danger');
          return;
        }
        //Error Check Non Integer
        if(!((y_low%1)===0)){
          document.getElementById("alert_placeholder").textContent = "Error!: Y Lower Bound not an integer";
          document.getElementById("alert_placeholder").setAttribute('class', 'alert alert-danger');
          return;
        }

        //temp vars
        var x_tmp = x_low;
        var y_tmp = y_low;

        //create table row
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);

        //empty first header
        var th = document.createElement('TH');
        th.setAttribute('style', 'background-color:#000000; color: #FFFFFF;')
        th.setAttribute('scope', 'col');
        th.width='20';
        th.appendChild(document.createTextNode(" "));
        tr.appendChild(th);

        //top header
        for(var k=x_tmp; k<=x_high; k++){
              var th = document.createElement('TH');
              th.setAttribute('style', 'background-color:#000000; color: #FFFFFF;')
               th.setAttribute('scope', 'col');
               th.width='20';
               th.appendChild(document.createTextNode(k));
               tr.appendChild(th);
        }
        //generate rest of table
        for (var i=x_low; i<=x_high; i++){
           var tr = document.createElement('TR');
           tableBody.appendChild(tr);

            //side header
              var th = document.createElement('TH');
              th.setAttribute('style', 'background-color:#000000; color: #FFFFFF;')
               th.setAttribute('scope', 'col');
               th.width='20';
               th.appendChild(document.createTextNode(y_tmp));
               tr.appendChild(th);
               y_tmp++;
               //main row
           for (var j=y_low; j<=y_high; j++){
               var td = document.createElement('TD');
               td.setAttribute('scope', 'col');
               td.width='20';
               td.appendChild(document.createTextNode(i * j));
               tr.appendChild(td);
           }
        }
        myTableDiv.appendChild(table);
        
    }

    function load() {
        console.log("Page load finished");
    }