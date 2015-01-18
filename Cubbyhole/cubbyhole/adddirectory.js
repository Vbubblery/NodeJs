var fs = require('fs');
module.exports.NewUser = function(name) {
    fs.mkdir("./files/" + name, 0777,
    function(err) {
        if (err) {
            return;
        }
    });
}
module.exports.ListDir = function(req,callback) {
    var Isdir = [];
    var Isfile = [];
    fs.readdir("./files/"+req.session.email+"/",
    function(err, data) {
        if (err) {
            console.error(err);
        } else {
            data.forEach(function(key) {
                if (fs.lstatSync("./files/"+req.session.email+"/" + key).isDirectory()) {
                    Isdir.push(key);
                } else {
                    Isfile.push(key);
                }
            });
            callback(err, Isdir, Isfile);
        }
    });
}
module.exports.MoveFile =function(src, dst){
    var is = fs.createReadStream(src);
    var os = fs.createWriteStream(dst);
    is.pipe(os);
    fs.unlink(src);
}
module.exports.NewDir =function(req){
	  fs.mkdir("./files/"+req.session.email+"/NewDir", 0777,
    function(err) {
        if (err) {
            return;
        }
    });
}
module.exports.Remove =function(file){
	fs.unlink(file);
}