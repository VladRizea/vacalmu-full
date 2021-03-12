module.exports = {

    getCookie(cname, context, req) {
    var name = cname + "=";
// if server
if (req) {
        if (req.headers.cookie) {
    var ca = req.headers.cookie.split(';');
        }
}
// if client
if (process.client) {
    var decodedCookie = document.cookie;
    var ca = decodedCookie.split(';');
}

for(var i = 0; i < ca.length; i++) 
{
    var c = ca[i];
while (c.charAt(0) == ' ') 
    {
    c = c.substring(1);
    }
if (c.indexOf(name) == 0) 
    {
    return c.substring(name.length, c.length);
    }
}
    return "";
}}