var express = require('express');
var router = express.Router();
const xlsxFile = require('read-excel-file/node');

var metaArr = new Array();
var childArr = new Array();

router.get('/fetchFilteredData', function(req, res, next) {
    XlsxFileName  = req.query.hiddenXlsxFileName;
    var brandSelected = req.query.brandOption;
    var MRPSelected = req.query.MRPOption;
    var styleCodeSelected = req.query.styleCodeOption;
    metaArr = [];
    xlsxFile('./xlsxFiles/'+XlsxFileName).then((rows) => {
        for (i in rows) {
            if (i == 1) {
                childArr = [];
                for (j in rows[i]) {
                    childArr.push(rows[i][j]);
                }
                metaArr.push(childArr);
            }
        }

        if(brandSelected!="" && MRPSelected=="" && styleCodeSelected==""){
          for (i in rows) {
            if(rows[i][0]==brandSelected) {
                childArr = [];
                for (j in rows[i]) {
                    childArr.push(rows[i][j]);
                }
                metaArr.push(childArr);
            }
          }
        }

        if(brandSelected=="" && MRPSelected!="" && styleCodeSelected==""){
            for (i in rows) {
                if(rows[i][34]==MRPSelected) {
                    childArr = [];
                    for (j in rows[i]) {
                        childArr.push(rows[i][j]);
                    }
                    metaArr.push(childArr);
                }
            }
        }

        if(brandSelected=="" && MRPSelected=="" && styleCodeSelected!=""){
            for (i in rows) {
                if(rows[i][7]==styleCodeSelected) {
                    childArr = [];
                    for (j in rows[i]) {
                        childArr.push(rows[i][j]);
                    }
                    metaArr.push(childArr);
                }
            }
        }

        if(brandSelected!="" && MRPSelected!="" && styleCodeSelected==""){
            for (i in rows) {
                if(rows[i][0]==brandSelected) {
                    if(rows[i][34]==MRPSelected) {
                        childArr = [];
                        for (j in rows[i]) {
                            childArr.push(rows[i][j]);
                        }
                        metaArr.push(childArr);
                    }
                }
            }
        }

        if(brandSelected!="" && MRPSelected=="" && styleCodeSelected!=""){
            for (i in rows) {
                if(rows[i][0]==brandSelected) {
                    if(rows[i][7]==styleCodeSelected) {
                        childArr = [];
                        for (j in rows[i]) {
                            childArr.push(rows[i][j]);
                        }
                        metaArr.push(childArr);
                    }
                }
            }
        }

        if(brandSelected=="" && MRPSelected!="" && styleCodeSelected!=""){
            for (i in rows) {
                if(rows[i][34]==MRPSelected) {
                    if(rows[i][7]==styleCodeSelected) {
                        childArr = [];
                        for (j in rows[i]) {
                            childArr.push(rows[i][j]);
                        }
                        metaArr.push(childArr);
                    }
                }
            }
        }

        if(brandSelected!="" && MRPSelected!="" && styleCodeSelected!=""){
            for (i in rows) {
                if(rows[i][0]==brandSelected) {
                    if(rows[i][34]==MRPSelected) {
                        if (rows[i][7]==styleCodeSelected) {
                            childArr = [];
                            for (j in rows[i]) {
                                childArr.push(rows[i][j]);
                            }
                            metaArr.push(childArr);
                        }
                    }
                }
            }
        }
        console.log(metaArr);


        res.render('result', {
            title: 'Arvind | Result',
            resultObject : metaArr
        });
    });
});

module.exports = router;