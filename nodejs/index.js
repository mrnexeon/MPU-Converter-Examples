const fs = require('fs');
const request = require('request');
const progress = require('request-progress');

////////////////////////////////////////////////////////////////////////////////////////

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTY2NDg1NTkxLCJleHAiOjE1OTgwMjE1OTF9.ykeUjEi8nDvAkW2XaRehYW9w8IvsupLPG6dzCETVGr0';
let exportFormat = 'gltf'; // <- Формат экспорта (step, iges, acis, jt, parasolid, c3d, gltf, stl, vrml)
let modelStream = fs.createReadStream(__dirname + '/shaft.stp') // <- Путь к сборке на диске

const options = {
    method: "POST",
    url: `http://195.133.144.86:4001/model?token=${token}&exportFormat=${exportFormat}`,
    headers: {
        "Content-Type": "multipart/form-data"
    },
    formData: {
        "model": modelStream
    }
};

progress(request(options))
    .on('progress', function (state) {
        console.log('Downloading model.. ' + state.percent * 100 + '%');
    })
    .on('error', function (err) {
        console.error(err);
    })
    .on('end', function () {
        console.log('Convert model has been downloaded')
    })
    .pipe(fs.createWriteStream(__dirname + '/shaft.gltf')); // <- Сохранение конвертированой модели