
//   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

//   * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.


const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();


var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var writeNote = function(res){
    fs.readFile(path.join(__dirname, "/db/db.json"), function(err, data) {
        if (err) throw err;
        let notes = JSON.parse(data);
        return res.status(200).json(notes);
    }) 
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
    // let note = JSON.stringify();
    console.log(req.body);
    
    // fs.appendFile(path.join(__dirname, "/db/db.json"),note,'utf8',function(err) {
    //     if (err) {
    //       throw err;
    //     }
    //     else {
    //       writeNote(res);
    //     }
    // });
});


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});