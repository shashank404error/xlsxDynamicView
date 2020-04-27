var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');
const xlsxFile = require('read-excel-file/node');

const directoryPath = path.join('./xlsxFiles');

//declearing array
var xlsxFileArr = new Array();
var brandArr = new Array();
var styleCodeArr = new Array();
var MRPArr = new Array();

fs.readdir(directoryPath, function (err, files) {

  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  files.forEach(function (file) {
    xlsxFileArr.push(file);
    console.log(file);
  });
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Arvind | Select file',
    xlsxFileObject : xlsxFileArr
  });
});

router.get('/xlsxFileSelected', function(req, res, next) {
  var xlsxFileSelected = req.query.xlsxFileOption;

  xlsxFile('./xlsxFiles/'+xlsxFileSelected).then((rows) => {

    //fetching brands index-0
    for (i in rows){
      for (j in rows[i]){
        if(i>2) {
          if(checkDup(brandArr,rows[i][0])){
            brandArr.push(rows[i][0]);
          }
        }
        break;
      }
    }

    //fetching style code index-7
    for (i in rows){
      for (j in rows[i]){
        if(i>2) {
          if(checkDup(styleCodeArr,rows[i][7])){
            styleCodeArr.push(rows[i][7]);
          }
        }
        break;
      }
    }

    //fetching MRP index - 34
    for (i in rows){
      for (j in rows[i]){
        if(i>2) {
          if(checkDup(MRPArr,rows[i][34])){
            MRPArr.push(rows[i][34]);
          }
        }
        break;
      }
    }

    res.render('mainFile', {
      title: 'Arvind | Homepage',
      xlsxFileName : xlsxFileSelected,
      brandoptions : brandArr,
      styleCodeoptions : styleCodeArr,
      MRPoptions : MRPArr
    });
  })

});

function checkDup(brandArrToPass,val){
  for( k in brandArrToPass){
    if(brandArrToPass[k]==val) return 0;
  }
  return 1;
}


module.exports = router;
