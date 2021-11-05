    // ADD NEW ITEM TO END OF LIST
        var node = document.createElement("LI");
        var textnode = document.createTextNode("Things");
        node.appendChild(textnode);
        document.getElementsByTagName('ul')[0].appendChild(node);

    // ADD NEW ITEM START OF LIST
        var node2 = document.createElement("LI");
        var textnode2 = document.createTextNode("Stuff");
        node2.appendChild(textnode2);
        document.getElementsByTagName('ul')[0].insertBefore(node2, document.getElementsByTagName('ul')[0].firstChild);

    // ADD A CLASS OF COOL TO ALL LIST ITEMS
        var nodes = document.getElementsByTagName('li');
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].setAttribute('class', 'cool');
        }
    // ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
        var cnt = nodes.length;
        var header = document.getElementsByTagName('h2')[0];
        var txt = header.textContent + " " + cnt;
        header.textContent = txt;

    

