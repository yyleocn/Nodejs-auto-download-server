# Nodejs-auto-download-server


```
git clone git@github.com:yyleocn/Nodejs-auto-download-server.git
cd Nodejs-auto-download-server
node server.js
```
* Open `https://localhost:1234` in your brower, choose to ignore the https error.
* Use `jQuery.ajax` or other ajax method post data to `https://localhost:1234` like this
``` javascript
$.ajax({
    url:'https://localhost:1234',
    type:'post',
    data:{
        fileName:'Your file name',
        content:'Your file content',
    }
}).then((data_)=>{
    console.log(data_);
});
```
