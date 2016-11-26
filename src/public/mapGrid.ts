import path = require('path')
import $ = require('jquery');
import * as Buffer from 'buffer'
import { Map } from './../shared/Map'
import { Storable } from './../shared/Storable'

window.onload = function() {
  document.getElementById('loadMap').onclick = function() { loadMap() }
}

function loadMap(): void {
  var file = 'testMap.json'
  var filepath = path.join(__dirname, file)
  try {
    $.getJSON( filepath, function( data ) {
      var jsonString:string = JSON.stringify(data)
      var newMap: Map = Storable.fromJSON(Map, jsonString)
      drawMap(newMap)
      //qqdebugOutput(data)
    });
  } catch(exception) {
    console.log($);
  }
  return
}

function drawMap(map:Map) {
  let width:number = map.width()
  let height:number = map.height()
  $('#mapContainer').css({ width: width*100, height: height*100 });

  var tiles: string[] = [];
  for (let row of map.tileIds) {
    for (let id of row) {
      tiles.push( "<div class='mapTile terrain" + id + "'></div>" )
    }
  }
  var allTiles:string = tiles.join("")
  $('#mapContainer').html(allTiles)
}

function qqdebugOutput(data:any) {
  var items: string[] = [];
  $.each( data, function( key, val ) {
    items.push( "<li id='" + key + "'>" + val + "</li>" );
  });

  $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "#div1" );
}
