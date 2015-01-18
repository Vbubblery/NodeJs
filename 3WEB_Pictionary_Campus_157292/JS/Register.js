
/*var ws = new WebSocket("ws://127.0.0.1:8080", "echo-protocol");*/

function init(){  
    var button =document.getElementById("Sub");
    
    button.onclick = function(){
        var usname = document.getElementById("username").value;
        var pw = document.getElementById('password').value;
        var objSel = document.getElementById("language");
        var lan = objSel.options[objSel.selectedIndex].text;
       
       var UserInfo = {};
       UserInfo.name=usname;
       UserInfo.password=pw;
       UserInfo.language = lan;
      var xhr = new XMLHttpRequest();
     xhr.open("POST","/newuser",false);
     xhr.send(JSON.stringify(UserInfo));
   }
}
