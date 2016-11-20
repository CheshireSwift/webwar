
var fs = require("fs"),
  json;

window.onload = function() {
  document.getElementById('infantrymans').onclick = function() { alert('pew') }

  document.getElementById('loadMap').onclick = function() { loadMap() }
}

function loadMap() {
  var file = "store/testMap.json"
  var filepath = __dirname + '/' + file;
  try {
  //  var jsonFile = readJsonFileSync(filepath);
  }
  catch(exception) {
  }
  //console.log("wtf m9 how can this line cause an error");
  return;
}


function readJsonFileSync(filepath, encoding){
    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}
