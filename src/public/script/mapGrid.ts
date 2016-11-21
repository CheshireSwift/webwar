import fs = require('fs')
import * as Buffer from 'buffer'

window.onload = function() {
  alert("did both");
  document.getElementById('loadMap').onclick = function() { loadMap() }
}

function loadMap(): void {
  var file = 'store/testMap.json'
  var filepath = __dirname + '/' + file
  try {
    var jsonFile = readJsonFileSync(filepath);
  } catch(exception) {
  }
  //console.log("wtf m9 how can this line cause an error");
  return
}

function readJsonFileSync(filepath: string, encoding: Buffer.Encoding = 'utf8'): any{
  var file: string = fs.readFileSync(filepath, encoding)
  return JSON.parse(file)
}
