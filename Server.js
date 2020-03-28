const express = require('express');
const Generator = require('id-generator')
const path = require('path');
const dbfile = require('./db/read');
const writeDb = require('./db/write');
const app = express();
const g = new Generator()


var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var writeNote = function(res){
    return res.status(200).json(dbfile);
};

//  all the routes
app.get("/assets/js/index.js", function(req,res){
        res.sendFile(path.join(__dirname, "/assets/js/index.js"));
});
app.get("/assets/css/styles.css", function(req,res){
    res.sendFile(path.join(__dirname, "/assets/css/styles.css"));
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});
  
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});
  
app.get("/api/notes", function(req, res) {
  writeNote(res);
});

app.post("/api/notes", function(req, res) {
    const newNote = req.body;
    let db = dbfile;
    newNote.id = g.newId();
    db.push(newNote);
    writeDb(db);
    res.json(db);
});

app.delete("/api/notes/:id",function(req,res){
    let id = req.params.id;
    let db= dbfile
    for(let i =0; i < db.length; i++){
        if(db[i].id === id ){
            db.splice(i,1);
            break;
        }
    }
    res.json(dbfile);
    writeDb(dbfile);
    });
   

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});