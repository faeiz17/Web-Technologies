// express->express & server->express
const express = require('express');
let server = express();

server.use(express.static("public"));

server.set("view engine",'ejs');

server.get('/',function(req,res){
    res.render('index')
})
server.get('/Api-porsche',function(req,res){
    res.render('crud')
})
server.listen(2500);