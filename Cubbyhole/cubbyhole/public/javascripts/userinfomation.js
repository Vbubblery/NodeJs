var content_div = document.getElementById('content_div');
var content_div_ul = document.createElement('ul');
var e=["Register","Loggin"];
e.forEach(function(event){LogginAndInformation(event)});
function LogginAndInformation(event){
var content_div_ul_li= document.createElement('li');
content_div_ul_li.innerHTML="<a href='/"+event+"'>"+event+"</a>";
content_div_ul.appendChild(content_div_ul_li);
content_div.appendChild(content_div_ul);
}
