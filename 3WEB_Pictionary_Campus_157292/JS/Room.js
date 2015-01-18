   var socket = io.connect();
   function abc(num){
        document.cookie=('roomname='+num);
        location.replace("/game") ;
      }
function init(){
	var rooms = document.getElementById("rooms");
       var NewRoom = document.getElementById("CreateNewRoom");
	var RoomInfo={};

     NewRoom.onclick=function(){
        var dialog = document.getElementById("dialog");
        dialog.show();
        var RoomName = document.getElementById("NameOfRoom");
        var closeBtn = document.getElementById("close");
        
        closeBtn.addEventListener("click",function(e){
        var objSel = document.getElementById("language");
        var LanguageSelect = objSel.options[objSel.selectedIndex].text;
        RoomInfo.name=document.getElementById("NameOfRoom").value;
        RoomInfo.language=LanguageSelect;
        socket.emit("new room",RoomInfo);
        dialog.close();
        document.cookie=('roomname='+RoomInfo.name);
        location.replace("/game") ;

        })
     }

     socket.emit("firsttimeroom","test");
     socket.on('all room',  function (data) {
       var b =data;
    rooms.innerHTML="";
        for (var i=0; i < b.length; i++) {
     var divRoom = document.createElement("div");
     divRoom.setAttribute("onclick","abc('"+b[i].name+"')");
      divRoom.setAttribute("class","roomcss")
      var rm = document.createElement("p");
      rm.innerHTML = b[i].name;
      divRoom.appendChild(rm);    
      rooms.appendChild(divRoom);
        }
     });
     
}