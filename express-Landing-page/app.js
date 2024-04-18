
const express = require('express');
const mongoose = require('mongoose')

let server = express();
let Story = require('./model/story')
let ejsLayouts = require("express-ejs-layouts");

server.use(ejsLayouts);
server.use(express.json());
server.use(express.static("public"));

server.set("view engine",'ejs');

server.get('/',function(req,res){
    res.render('homepage')
})
server.get('/Api-porsche',function(req,res){
    res.render('crud')
})
server.listen(2500);



