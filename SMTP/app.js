var smtp = require('smtp-protocol');
var SendEm = require('./sendemail');
var listenerAry=[];
var mail=[];

//Conf a SMTP server(like a mail server) with 25 port.
var server = smtp.createServer(function(req) {
  //Listen the mail send to who.
  req.on('to',
    //callback function
    function(to, ack) {
      var domain = to.split('@')[1] || 'example.com';
      if (domain === 'example.com') ack.accept()
        else ack.reject()
      });
  //Listen the mail's content.
  req.on('message',
    function(stream, ack) {
      //listen the data from stream.
      stream.on('data',
        function(chunk) {
          mail.push(chunk.replace(/[\r\n]/g, ""));
        });
      //when the data from the stream finish. callback a function:
      stream.on('close', function(){
        mail.push("The Email come from: "+req.from);
        for (var i = req.to.length - 1; i >= 0; i--) {
          checkAry(req.to[i]);
        };
      });
      ack.accept();
    });
});
server.listen(25);

//Conf a Http server.
var http = require("http");
var fs = require('fs');
var httpserver = http.createServer(function(req, res){
  //when a require from the ip such as 127.0.0.1(localhost)
  if(req.url=="/"&& req.method =="GET"){
    res.writeHead(200,{"Content-Type":"text/html"});
    //return the index.html file's content.
    res.write(fs.readFileSync("index.html")); 
    //res is ending.
    res.end();
  }
  //when a method="post".
  if(req.url =="/newListener" && req.method =="POST"){
    req.on("data",function(data){
      listenerAry.push(JSON.parse(data));
    });
    res.end();
  }
});
httpserver.listen(8080);
var checkAry = function(name){
  for (var i = listenerAry.length - 1; i >= 0; i--) {
   if (listenerAry[i].Lmail == name) {
    SendEm.sendEmail(listenerAry[i].Tmail,mail);
    return;
  }
};
}