const { writeFileSync } = require('fs');
const readlineSync = require('readline-sync');
fs = require('fs');
const welcome = "Hello, brudda! Here's list of commands:\nVT is for View Title \nVA is for View All \nAN is for Add Note \nDN is for Delete Note\nEN is for Edit Note\nUZ is for Uidyom iz Zooparka\n";
let cond = true;
while (cond) {
  let mode = readlineSync.question(welcome);

  switch (mode) {
    case "VT": {
      let string_notes = fs.readFileSync("jsnotes.json", "utf8");
      let json_notes = JSON.parse(string_notes, function (key, value) {
        if (key == "body") return undefined;
        return value;
      });
      console.log(json_notes);
    }
      break;

    case "VA": {
      let string_notes = fs.readFileSync("jsnotes.json", "utf8");
      let json_notes = JSON.parse(string_notes);
      console.log(json_notes);
    }
      break;

    case "AN":
      {
        let string_notes = fs.readFileSync("jsnotes.json", "utf8");
        let json_notes = JSON.parse(string_notes);
        let note = { "title": "", "body": "" };
        let title = readlineSync.question("Enter title\n");
        let body = readlineSync.question("Then body\n");
        note.title = title;
        note.body = body;
        json_notes.push(note);
        string_notes = JSON.stringify(json_notes, null, ' ');
        writeFileSync("jsnotes.json", string_notes);
      } break;

    case "DN":
      {
        let number_of_note = readlineSync.question("type number of note starting with 1\n");
        let string_notes = fs.readFileSync("jsnotes.json", "utf8");
        let json_notes = JSON.parse(string_notes);
        json_notes.splice(number_of_note - 1, 1); //   LOOK! NUM - 1, CUZ USER STARTS WITH 1!
        string_notes = JSON.stringify(json_notes, null, ' ');
        writeFileSync("jsnotes.json", string_notes);
      }
      break;

    case "EN":
      {
        let number_of_note = readlineSync.question("type number of note starting with 1\n");

        let string_notes = fs.readFileSync("jsnotes.json", "utf8");
        let json_notes = JSON.parse(string_notes);

        let note = { "title": `default title of note №${number_of_note}`, "body": `default body of note №${number_of_note}` };
        let title = readlineSync.question("Enter new title\n");
        let body = readlineSync.question("Then new body\n");
        if (title != "") note.title = title;
        // if new title or body are empty, they will be changed to default  
        if (body != "") note.body = body;
        json_notes.splice(number_of_note - 1, 1, note); //   LOOK! NUM - 1, CUZ USER STARTS WITH 1!
        string_notes = JSON.stringify(json_notes, null, ' ');
        writeFileSync("jsnotes.json", string_notes);
      }

      break;


    case "UZ": cond = false; break;
    default: console.log("Write correct command\n");

  }
}

