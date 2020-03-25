
//   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

//   * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.


const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
const filename ="/db/db.json";

const writeDb = (db)=> {fs.writeFileSync(path.join(__dirname, filename),JSON.stringify(db),(err, data) => { if (err) throw err; } ); };

const dbfile = JSON.parse(fs.readFileSync(path.join(__dirname, filename),(err, data) => {
    if (err) throw err;
}));
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var writeNote = function(res){
    return res.status(200).json(dbfile);
};

 
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
    db.push(newNote);
    writeDb(db);
    res.json(db);
});


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});