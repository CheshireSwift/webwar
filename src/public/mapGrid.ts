import path = require('path')
import $ = require('jquery');
import * as Buffer from 'buffer'
import { Map } from './../shared/Map'
import { Storable } from './../shared/Storable'
import { Army } from './../shared/Army'

window.onload = function() {
  $('#loadMap').click(function() { loadMap() })
  $('#loadUnits').click(function() { loadUnits() })
}

function loadUnits(): void {
  let testArmy = Army.test()
  drawArmy(testArmy)
}

function mapScale(): number {
  return 100
}

function drawArmy(army: Army) {
  let mapWidth =$('#mapContainer').width() / mapScale()
  for (let unit of army.units) {
    let targetIndex = unit.xPos + (unit.yPos * mapWidth)
    let targetMapTile = $('#mapContainer').children().eq(targetIndex);
      targetMapTile.html( "<div class='unitSlot unit" + unit.typeId + "'></div>" ) //qqtas - find that numbered tile of the map and draw in it
  }
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
  $('#mapContainer').css({ width: width * mapScale(), height: height * mapScale() });

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
