module.exports = function(app) {
    var path = require('path');
    var crypto = require('crypto'),
    sql = require('../sql'),
    session = require('../cubby_session'),
    filter = require('../filter'),
    user_filter = require('../filter_userinfo'),
    dir = require('../adddirectory');
    app.get('/',
    function(req, res) {
        user_filter.userstatus(req, res,
        function(first, two) {
            res.render('index', {
                title: 'Cubblyhole',
                first: first,
                two: two
            });
        });
    });
    app.get('/Register',
    function(req, res) {
        user_filter.userstatus(req, res,
        function(first, two) {
            res.render('Register', {
                title: 'Register',
                first: first,
                two: two
            });
        });
    });
    app.post('/Register',
    function(req, res) {
        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body.password).digest('base64'); //md5 password.
        var values = [req.body.email, password];
        sql.InsertUser(values,
        function(error, results) {
            session.EmailSession(req, res, req.body.email);
            session.PasswordSession(req, res, password);
            dir.NewUser(req.body.email);
            res.redirect("/");
        });
    });
    app.get('/Login',
    function(req, res) {
        user_filter.userstatus(req, res,
        function(first, two) {
            res.render('Login', {
                title: 'Login',
                first: first,
                two: two
            });
        });
    });
    app.post('/Login',
    function(req, res) {
        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body.password).digest('base64');
        var values = req.body.email;
        console.log(req.body.password);
        sql.CheckUser(values,
        function(error, results) {
            if (error) {
                return res.end(error.message);
            }
            if (results[0].password == password) {
                session.EmailSession(req, res, req.body.email);
                session.PasswordSession(req, res, password);
                return res.redirect('/');
            }
        })
    });
    app.get('/Mydisk',filter.authorize,
    function(req, res) {
        res.render('Mydisk', {
            title: 'Mydisk',
            who:req.session.email
        });
    });
    app.get('/Profile/:email',filter.authorize,
    function(req, res) {
        /*          res.send(req.params.email);*/
    });
    app.get('/getdata',
    function(req, res, next) {
        dir.ListDir(req,
        function(error, dir, file) {
            res.json({
                dir: dir,
                file: file
            });
        });
    });
    app.get('/LoginOut',
    function(req, res) {
        session.DestorySession(req, res);
        return res.redirect("/");
    });
    app.get('/ajaxWork',
    function(req, res) {
        return res.file();
    });

    app.get('/MoveToDir/:file/:dir',
    function(req, res) {
        dir.MoveFile(path.dirname(__dirname) + "/files/" + ""+req.session.email+"/" + req.params.file, path.dirname(__dirname) + "/files/" + ""+req.session.email+"/" + req.params.dir + "/" + req.params.file);
        res.end();
    });
    app.get('/NewDir',
    function(req, res) {
        dir.NewDir(req);
        res.end();
    });
    app.get('/delete/:file',
    function(req, res) {
        dir.Remove(path.dirname(__dirname) + "/files/" + ""+req.session.email+"/" + req.params.file);
        res.redirect('/Mydisk');
    });
    app.get('/download/:file',
    function(req, res) {
        res.download(path.dirname(__dirname) + "/files/" + "" + req.session.email + "/" + req.params.file);
    });
    app.get('/dload/:who/:file',function(req,res){
        res.download(path.dirname(__dirname) + "/files/" + "" + req.params.who + "/" + req.params.file);
    });
    app.get('/up',filter.authorize,
        function(req,res){
         user_filter.userstatus(req, res,
        function(first, two) {
            res.render('up', {
                title: 'up',
                first: first,
                two: two
            });
        });
    });
    app.post('/up',function(req,res){
        if(req.body.plan=='a'){
            sql.updateplan(req,"A");
        }else if(req.body.plan=='b'){
            sql.updateplan(req,"B");
        }
        res.redirect("/");
    });
    app.get('/downpath/:file',function(req,res){
        res.send("http://127.0.0.1:8080/dload/"+req.session.email+"/"+req.params.file);
    })
}