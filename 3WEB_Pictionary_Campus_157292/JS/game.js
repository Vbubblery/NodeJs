var user = document.getElementById("userlist");
var maxtime = 60 ;
  var socket = io.connect(); // TIP: .connect with no args does auto-discovery
     socket.emit("roomname",getCookie("roomname"));
     socket.on('connect', function () {
            var name = getCookie("username");
            var thisroom = getCookie("roomname");
            socket.emit('nickname', {thename:name,theroom:thisroom});
        })
  socket.on("Getmessage",function(data){
        var allmessage=document.getElementById("allmessage");
        allmessage.innerText = allmessage.value+"\n"+data.message;
        allmessage.scrollTop=document.getElementsByTagName('textarea')[0].scrollHeight;
  });
  var btn = document.getElementById("messagesubmit");
  btn.onclick=function(){
    var Themessage = document.getElementById("word").value;
    console.log(getCookie("roomname"));
    socket.emit("chat",{who:getCookie("username"),message:Themessage,where:getCookie("roomname")});
    document.getElementById("word").value="";
  }
var StartGame = document.getElementById("begin");
StartGame.onclick = function(){

}

 var color = "#df4b26";
 var line =5;
 var canvas = document.getElementById("graph");
 var context = canvas.getContext("2d");
  var clickX = new Array();
 var clickY = new Array();
 var clickDrag = new Array();
 var colorselect = document.getElementById("colorselect");
 colorselect.onchange= function(){
  var tmp =colorselect.options[colorselect.selectedIndex].value
   socket.emit("color",{color:tmp,line:"5"});
  }
  socket.on("getcolor",function(data){
       color=data.color;
       line=data.line;
  })
 var white = document.getElementById("white");
 white.onclick = function(){
  socket.emit("eraser",{eraser:"white",line:"20"});
 }
  socket.on("geteraser",function(data){
       color=data.eraser;
       line=data.line;
  })
 var flag;
 var point = {};
 point.notFirst = false;
 var ishost = false;

if (ishost) {
  canvas.onmousedown = function  (e) {
    flag = true;
    socket.emit("mousedown",{linex: e.pageX-this.offsetLeft,liney:e.pageY-this.offsetTop,where:getCookie("roomname")});
   /* addClick(e.pageX-this.offsetLeft,e.pageY-this.offsetTop);*/
 }
     socket.on("yourdown",function(data){
        point = {};
        addClick(data.linex,data.liney);
    });
 canvas.onmousemove = function(e){
     if(flag){
      socket.emit("mouseup",{linex: e.pageX-this.offsetLeft,liney:e.pageY-this.offsetTop,where:getCookie("roomname")});
     }
 }
       socket.on("yourup",function(data){
           addClick(data.linex,data.liney,true);
           redraw();
    });
 canvas.onmouseup = function(e){
     flag = false;
 }
 canvas.onmouseout = function(e){
  flag = false;

 }
};


 function addClick(x,y,dragging){
     clickX.push(x);
     clickY.push(y);
     clickDrag.push(dragging);
    }
    function clearcanvas(){
     context.clearRect(0,0,990,625);
    }
    function redraw(){
     context .strokeStyle = color;
     context.lineJoin = "round";
     context.lineWidth=line;
     while(clickX.length >0){
      point.bx = point.x;
      point.by = point.y;
      point.x = clickX.pop();
      point.y = clickY.pop();
      point.drag = clickDrag.pop();
      context.beginPath();
      if (point.drag&&point.notFirst) {
           context.moveTo(point.bx,point.by);
      }else{
           point.notFirst = true;
           context.moveTo(point.x-1,point.y);
      }
      context.lineTo(point.x,point.y);
      context.closePath();
      context.stroke();
     }
    }


function time(){
if(maxtime>=0){   
minutes = Math.floor(maxtime/60);   
seconds = Math.floor(maxtime%60);   
msg = minutes+":"+seconds;   
document.all["timer"].innerHTML=msg;   
--maxtime;   
}   
else{   
clearInterval(timer);   
}   
}   
timer = setInterval("time()",1000);

socket.on('usercome',function(data){
   document.getElementById("userlist").innerHTML="";
   
 for (var a in data){
  var mObject = data[a];
    user.innerHTML+="<option value='" + mObject.name + "'>" + mObject.name + "</option>";
 }
    
});
function getCookie(name)//get the value of cookies.     
{
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
     if(arr != null) return unescape(arr[2]); return null;

}
function deleCookie(name,language,room)
{
 document.cookie =("username="+name+";Max-Age=0");
 document.cookie =("language="+language+";Max-Age=0");
 document.cookie =("roomname="+room+";Max-Age=0");
}
window.onbeforeunload = function(){  
 socket.emit("leave",getCookie(roomname));
   document.cookie =("roomname=;Max-Age=0");

    return "quit?";     
} 