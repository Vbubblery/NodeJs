module.exports.EmailSession = function(req, res, email) {
    req.session.email = email;
}
module.exports.PasswordSession = function(req, res, password) {
    req.session.password = password;
}
module.exports.DestorySession = function(req, res) {
    req.session.destroy();
}
