
var promise = require('promise');
var configpath = require('../config');
function mkDir(req) {
    var path = getFileDir(req);
    var ndir = require('ndir');
    var mkdir = promise.denodeify(ndir.mkdir);
    return  mkdir(path).then(function (err) {
        if (err) {
            throw err;
        }
		console.log(path);
        return path;
    });

}

function getFileDir(req) {
    var basePath = configpath.Global(req);
    return basePath;
}
exports.mkDir = mkDir;