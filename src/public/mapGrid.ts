import path = require('path')
import $ = require('jquery');
import * as Buffer from 'buffer'

window.onload = function() {
  document.getElementById('loadMap').onclick = function() { loadMap() }
}

function loadMap(): void {
  var file = 'testMap.json'
  var filepath = path.join(__dirname, file)
  try {


    $.getJSON( filepath, function( data ) {
      var items: string[] = [];
      $.each( data, function( key, val ) {
        items.push( "<li id='" + key + "'>" + val + "</li>" );
      });

      $( "<ul/>", {
        "class": "my-new-list",
        html: items.join( "" )
      }).appendTo( "body" );
    });


    /*$.ajax({url: filepath, success: function(result){
        var parsedJSON = JSON.parse(result)
        $("#div1").html(parsedJSON);
    }});*/
  } catch(exception) {
    console.log($);
  }
  return
}

function readJsonFileSync(filepath: string, encoding: Buffer.Encoding = 'utf8'): any{
  //var file: string = fs.readFileSync(filepath, encoding)
  //return JSON.parse(file)
}
