var sql = require('./db');
module.exports.GetUser = function(callback) {
    sql.query("select * from users",
    function(err, results) {
        if (err) {
            console.log(err.message);
            sql.end();
            return;
            /*results.forEach(function(key){
           console.log(key);
    });*/
        }
        callback(err, results);
    });
}
module.exports.InsertUser = function(values, callback) {
    sql.query('INSERT INTO users SET email=?,password=?', values,
    function(err, results) {
        if (err) {
            console.log(err.message);
            sql.end();
            return;
        }
        callback(err, results);
    });
}
module.exports.CheckUser = function(values, callback) {
    sql.query("select * from users where email='" + values + "'limit 1",
    function(err, results) {
        if (err) {
            console.log(err.message);
            sql.end();
            return;
        }
        console.log(results);
        callback(err, results);
    });
}
module.exports.updateplan = function(req,value){
    sql.query(
        "update users set plan='"+value+"' where email='"+req.session.email+"'");
    sql.end();
}
module.exports.checkplan=function(req){
    sql.query("select * from users where email='" + req.session.email + "'limit 1",
        function(err, results) {
        if (err) {
            console.log(err.message);
            sql.end();
            return;
        }
    });}

