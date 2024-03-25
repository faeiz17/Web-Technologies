const express = require("express");
let server = express();

server.use(express.static("public"));
server.set("view engine","ejs");

server.get("/api/stories",function(req,res){
    res.send([
        {title: "Story 1",content: "story 1 content"},
        {title: "Story 1",content: "story 1 content"},
    ])
});
server.get("/contact-us", function (req, res) {
    //route to handle / get request
    res.render("contact-us");
  });
  server.get("/", function (req, res) {
    //route to handle / get request
    res.render("homepage");
  });
  
  server.listen(4000);