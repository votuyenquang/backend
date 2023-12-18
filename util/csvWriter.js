const fs = require('fs');
var csvWriter = require('csv-write-stream');
var writer = csvWriter({sendHeaders: false});
const csvFilename = "D:\DataBE.csv";

const csvWriterAddData = (userID) =>{
    writer.pipe(fs.createWriteStream(csvFilename, {flags: 'a'}));
    writer.write({
         headear1 : userID,
         headear2 : "Text Data",
         headear3 : "Text Data",
         headear4 : "Text Data",
         headear5 : "Text Data",
         headear6 : "Text Data",
         headear7 : "Text Data",

    });
    writer.end();
}

module.exports = csvWriterAddData
