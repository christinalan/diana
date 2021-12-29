let express = require("express");
let app = express();
let bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use("/", express.static("public"));

app.listen(3000, () => {
  console.log("listening at localhost:3000");
});

//DB
let Datastore = require('nedb');
let db = new Datastore('responses.db');
db.loadDatabase();

//need to add a route to server that listens for a POST request for tips
app.post('/tips', (req, res) => {
  console.log(req.body);

  let obj = {
    tip: req.body.tip
  }

//insert tip into database
db.insert(obj, (err, newDocs) => {
    if (err) {
      res.json({task:"task failed"})
    } else {
      res.json({task:"success"});
    }
  })
})

//route to get all logged tips
app.get('/gettips', (req, res) => {
  db.find({}, (err, docs) => {
    if (err) {
      res.json({task: "task failed"})
    } else {
      console.log(docs)
      let obj = {data: docs};
      res.json(obj);
    }
  })
})
