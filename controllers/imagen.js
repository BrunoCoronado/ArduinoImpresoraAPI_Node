const img2gcode = require("img2gcode");
const fs = require('fs');
const index = require("../index");

async function get(request, response, next){
    try {
        response.status(200).end("recibiendo imagen");
        /*response.status(200).json({
            gcode: index.cola.shift()
        });*/
    } catch (error) {
        next(error);
    }
}

async function post(request, response, next){
    try {
        await img2gcode.start({ 
                toolDiameter: 1,
                scaleAxes: 40,
                deepStep: -1,
                feedrate: { work: 1200, idle: 3000 },
                whiteZ: 0,
                blackZ: -2,
                safeZ: 1,
                info: "emitter", 
                dirImg: request.files.imagen.path
            }).on('log', (str) => {
                if(str.includes("Sava As"))
                    //index.cola.push(fs.readFileSync('assets\\impresiones\\' + str.substring(str.lastIndexOf('\\') + 1, str.length), 'utf8'));
            });
            response.status(200).end("imagen subida");
    } catch (error) {
        next(error);
    }
}

module.exports.get = get;
module.exports.post = post;