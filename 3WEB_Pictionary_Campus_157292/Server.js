var http = require("http");
var fs = require('fs');
var events = require('events');
var eventEmitter = new events.EventEmitter();
/*var WebSocketServer = require('websocket').server;*/
var Cookies = {};
var Allroom=[];
var GuessWords = [];
  var client=require('mysql').createConnection({
        'host':'localhost',
        'port':'3306',
        'user':'root',
        'password':'13658444998'
});
        ClientConnectionReady = function(client)
       {
    client.query('USE fornode', function(error, results) {
        if(error) {
            console.log('ClientConnectionReady Error: ' + error.message);
            client.end();
            return;
        }
        GetDate(client);
    });
};
GetDate = function(client)
{
    client.query(
   "SELECT name FROM words",
    function selectdate(error, results, fields){
        if (error) {
            console.log('GetData Error: ' + error.message);
            client.end();
            return;
        }
        if(results.length>0)
        {
          results.forEach(function(key){
           GuessWords.push(key.name);
    });
          var n = Math.floor(Math.random()*GuessWords.length +1)-1;
          console.log(GuessWords[n]);
        }
});
    client.end();
    console.log('Closed');
}
ClientConnectionReady(client);
var server = http.createServer(function(req, res){

  req.headers.cookie && req.headers.cookie.split(';').forEach(function( Cookie ) {
        var parts = Cookie.split('=');
        Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
       });
    if(req.url =="/newuser" && req.method =="POST"){
       var TheNewUser ="";
        req.on("data",function(data){
            TheNewUser = data;
        });
 req.on("end", function(){
     var userParsed = JSON.parse(TheNewUser);
    console.log('Connecting to MYSQL...');
var client=require('mysql').createConnection({
    'host':'localhost',
    'port':'3306',
    'user':'root',
    'password':'13658444998'
});
ClientConnectionReady = function(client)
{
    client.query('USE fornode', function(error, results) {
        if(error) {
            console.log('ClientConnectionReady Error: ' + error.message);
            client.end();
            return;
        }
        InsertDate(client);
    });
};
InsertDate = function(client){
    var values=[userParsed.name,userParsed.password,userParsed.language];
    client.query('INSERT INTO user SET username=?,password=?,language=?',
        values,
        function(error,results){
            if (error) {
                console.log('ClientReady Error:'+error.message);
                client.end();
            return;
            }
            console.log('Inserted:'+results.affectedRows+'row.');
        console.log('Id inserted:'+results.insertId);
        }
        );
}
ClientConnectionReady(client);
   });
    }
       if(req.url == "/register" && req.method == "GET"){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write(fs.readFileSync("Register.html")); 
        res.end();
    }
    if(req.url == "/loggin" && req.method == "GET"){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write(fs.readFileSync("Loggin.html")); 
        res.end();
    }
     if(req.url == "/game" && req.method == "GET"){
      Cookies={};
      if (req.headers.cookie==null) {
       res.writeHead(301, {
                'Location': '/loggin'
            });
            res.end();
      }else{
       req.headers.cookie && req.headers.cookie.split(';').forEach(function( Cookie ) {
        var parts = Cookie.split('=');
        Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
       });

        res.writeHead(200,{"Content-Type":"text/html"});
        res.write(fs.readFileSync("Gaming.html")); 
        res.end();
       }
    }
    
     if(req.url == "/room" && req.method == "GET"){
       Cookies={};
      if (req.headers.cookie==null) {
       res.writeHead(301, {
                'Location': '/loggin'
            });
            res.end();
      }
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write(fs.readFileSync("Room.html")); 
        res.end();
    }
  
    if(req.url =="/oneuser" && req.method =="POST"){

       var TheUser ="";
        req.on("data",function(data){
            TheUser = data;
        });
 req.on("end", function(){
     var userParsed = JSON.parse(TheUser);
    console.log('Connecting to MYSQL...');
var client=require('mysql').createConnection({
    'host':'localhost',
    'port':'3306',
    'user':'root',
    'password':'13658444998'
});
ClientConnectionReady = function(client)
{
    client.query('USE fornode', function(error, results) {
        if(error) {
            console.log('ClientConnectionReady Error: ' + error.message);
            client.end();
            return;
        }
        GetDate(client);
    });
};
GetDate = function(client)
{
    client.query(
   "SELECT * FROM user where username='" + userParsed.name + "' limit 1",
    function selectdate(error, results, fields){
        if (error) {
            console.log('GetData Error: ' + error.message);
            client.end();
            return;
        }
        if(results.length>0)
        {
          results.forEach(function(key){
            //Here!How to 301!!!!
            if(key.password!=userParsed.password)
            {
              res.writeHead(301, {
                'Location': '/room'
            });
            res.end();
            }
            else
            {
                res.writeHead(200, {
                'Set-Cookie': ['username='+key.username+'; Expires=Wed, 13-Jan-2021 22:23:01 GMT;', 'language='+key.language+'; Expires=Wed, 13-Jan-2021 22:23:01 GMT;']
    });
            res.end();
            }
    }
          );
        }

});

    client.end();
    console.log('Closed');
}
ClientConnectionReady(client);
   });

    }
if(req.url == "/file.js" && req.method == "GET"){
        res.writeHead(200,{"Content-Type":"text/javascript"});
        res.write(fs.readFileSync("JS/Register.js")); 
        res.end();
     }
     if(req.url == "/gamefile.js" && req.method == "GET"){
        res.writeHead(200,{"Content-Type":"text/javascript"});
        res.write(fs.readFileSync("JS/game.js")); 
        res.end();
     }
if(req.url=="/loginfile.js"&& req.method =="GET"){
        res.writeHead(200,{"Content-Type":"text/javascript"});
        res.write(fs.readFileSync("JS/Loggin.js")); 
        res.end();
}
  if(req.url=="/roomfile.js"&& req.method =="GET"){

      res.writeHead(200,{"Content-Type":"text/javascript"});
        res.write(fs.readFileSync("JS/Room.js")); 
        res.end();
}


/*    if(req.url == "/stream" && req.method == "GET"){
        res.writeHead(200,
            {"Content-Type":"text/event-stream",
             "Connection":"keep-alive"});
            eventEmitter.on("newroom", function(aa){
            res.write("data:"+ JSON.stringify(aa)+"\n\n"); 
        });
     }*/
});
server.listen(8080);
function userObject(){
    this.name;
}
io = require('socket.io').listen(server);
io.set('log level', 1);
io.sockets.on('connection', function (socket) {
var a = [];

var theroom="";
socket.on('roomname', function (room) {
 theroom=room;
 socket.join(room);
});
  socket.on('nickname', function (name) {

    var roster = io.sockets.clients(name.theroom);
            socket.nickname=name.thename;
            roster.forEach(function(client) {
             var mUser = new userObject();
             mUser.name = client.nickname;
            a.push(mUser);
});
            socket.emit('usercome',a);
            socket.broadcast.to(name.theroom).emit('usercome',a);
        a=[];

    });
function roomObject(){
 this.name;
 this.language;
}

  socket.on('new room',function (data) {
   var mRoom = new roomObject();
   mRoom.name=data.name;
   mRoom.language=data.language;
   Allroom.push(mRoom);
    console.log(Allroom);
    socket.emit("all room",Allroom);
   socket.broadcast.emit("all room",Allroom);
  });
  socket.on('firsttimeroom',function(data){
    socket.emit("all room",Allroom);
   socket.broadcast.emit("all room",Allroom);
  })
  socket.on('chat', function(data){
   console.log(theroom+"2");
 socket.broadcast.to(data.where).emit("Getmessage", {message:  data.who+": "+data.message});
 socket.emit("Getmessage", {message:  "Me: "+data.message});
  });
  socket.on('mousedown',function(data){
       socket.emit("yourdown",{linex:data.linex,liney:data.liney});
       socket.broadcast.to(data.where).emit("yourdown",{linex:data.linex,liney:data.liney});
  });
  socket.on('mouseup',function(data){
       socket.emit("yourup",{linex:data.linex,liney:data.liney});
       socket.broadcast.to(data.where).emit("yourup",{linex:data.linex,liney:data.liney});
  });
    socket.on('eraser',function(data){
       socket.emit("geteraser",{eraser:data.eraser,line:data.line});
       socket.broadcast.emit("geteraser",{eraser:data.eraser,line:data.line});
  });
        socket.on('color',function(data){
       socket.emit("getcolor",{color:data.color,line:data.line});
       socket.broadcast.emit("getcolor",{color:data.color,line:data.line});
  });
        socket.on('leave',function (data) {
         socket.leave(data);
        })
});

  