const fileType = require('file-type');
const Note = require('../models/Note');
const path = require('path');
const readChunk = require('read-chunk');
var PDFImage = require("pdf-image").PDFImage;
var fs = require('fs');
const PDFJS = require("pdfjs-dist");

function getImage(pdfPath, pageNumber){
    return new Promise((resolve, reject) => {
        let options = {
            "-resize": "600x800"
        }
        let pdfImage = new PDFImage(pdfPath, options);
        pdfImage.convertPage(pageNumber).then(function (imagePath) {
            fs.readFile(imagePath, (err, data) => {
                let buffer = new Buffer(data).toString('base64');
                if(err) {
                    reject(err)
                } else {
                    resolve({
                        "data": buffer,
                        "contentType": "image/png" 
                    })
                }

            })
            }, err => {
                reject(err);
            });
    })
    
}
let pdfThumbnail = {
    "makeThumbnail": function(path, cb) {
        const buffer = readChunk.sync(path, 0, 4100);
        if (fileType(buffer).mime == 'application/pdf') {
            
            let promises = [];
            PDFJS.getDocument(path).then(function(pdf) {
                for(let i = 0; i < pdf.numPages; i++){
                    promises.push(getImage(path, i))
                }
                Promise.all(promises).then(thumbnails => {
                    cb(null, thumbnails);
                }, err => {
                    cb(err, null);
                })
            });  
        } else {
            cb("not pdf", null)
        }
    }
}
module.exports = pdfThumbnail;