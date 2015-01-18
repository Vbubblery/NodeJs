/**
 * FileName:config.js
 *
 * Author:wangyan
 * Date:2013-10-26 21:42
 * Version:V1.0.0.0
 * Email:yywang1991@gmail.com
 * Describe:  app confilg
 *
 * Change Record:
 * {        date    name    describe}
 *
 */


module.exports.Global = function(req) {
    return __dirname + "/files/"+req.session.email+"/";
}






//trang.willian@gmail.com