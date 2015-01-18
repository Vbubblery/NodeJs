/*var ws = new WebSocket("ws://127.0.0.1:8081", "echo-protocol");*/
function init(){
       var button =document.getElementById("Sub");
            button.onclick = function(){
            var usname = document.getElementById("username").value;
            var pw = document.getElementById('password').value;
           var CheckLogin = {};
       CheckLogin.name=usname;
       CheckLogin.password=pw;
      var xhr = new XMLHttpRequest();
     xhr.open("POST","/oneuser",false);
     xhr.send(JSON.stringify(CheckLogin));
     location.replace("/room") ;
   }
  var register = document.getElementById("register");
   register.onclick=function(){
            location.replace("/register");
   }
}