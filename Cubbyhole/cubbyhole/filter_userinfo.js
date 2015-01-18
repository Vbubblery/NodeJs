module.exports.userstatus=function(req,res,callback){
if(req.session.email==null)
{
 var first="<a href='/Register'>Register</a>";
 var two="<a href='/Login'>Login</a>";
}else{
  var first="<a href='/Profile/" + req.session.email+ "'''>My Profile</a>";
 var two="<a href='/LoginOut'>Log-Out</a>";
}
callback(first, two);
}