var XLSX = require('xlsx');
var workbook = XLSX.readFile('indiv.xlsx');
var sheetNames = workbook.SheetNames;
// get only the first sheet of the file
const sheet = sheetNames[0];
var worksheet = workbook.Sheets[sheet];
var headers = {};
var datas = [];
for (let sheetData in worksheet) {
  // remove first column
  console.log(sheetData);
  if (sheetData[0] === '!') continue;
  //parse out the column, row, and value
  var lastLetter = 0;
  for (var i = 0; i < sheetData.length; i++) {
    if (!isNaN(sheetData[i])) {
      lastLetter = i;
      break;
    }
  }
  var col = sheetData.substring(0, lastLetter);
  var row = parseInt(sheetData.substring(lastLetter));
  var value = worksheet[sheetData].v;

  //store header names
  if (row === 1 && value) {
    headers[col] = value.trim();
    continue;
  }

  if (!datas[row]) {
    datas[row] = {};
  }
  datas[row][headers[col]] = value;
}
//drop those first row
datas.shift();

console.log(datas);
