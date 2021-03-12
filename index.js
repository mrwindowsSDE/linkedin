const express = require("express");
const app = express();
const PORT = 5000;
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.options("*", cors());
connectionString =
  "mongodb+srv://treyv:test123@cluster0.chs8q." +
  "mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(
  connectionString,
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);

const Student = require("./studentSchema");

app.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);
});

app.get("/students", function (req, res) {
  Student.find({}, (err, result) => {
    res.json(result);
  });
});

app.delete("/student", function (req, res) {
  let userIdToRemove = mongoose.Types.ObjectId(req.body.userIdToRemove);
  Student.findByIdAndDelete(userIdToRemove, function (err, deletedEntry) {
    if (err) console.log(err);
    Student.find({}, function (err2, results) {
      res.send(results);
    });
  });
});

app.post("/student", function (req, res) {
  let { name, role, company, linkedIn, picture } = req.body;
  const studentToInsert = new Student({
    name,
    role,
    company,
    linkedIn,
    picture,
  });

  studentToInsert.save(function (error, saved) {
    if (error) console.log(error);
    Student.find({}, function (err2, results) {
      res.send(results);
    });
  });
});

app.put("/student", function (req, res) {
  let { id, name, role, company, linkedIn, picture } = req.body;
  Student.findByIdAndUpdate(
    id,
    { $set: { name, role, company, linkedIn, picture } },
    { useFindAndModify: false },
    function (err, result) {
      if (err) console.log(err);
      Student.find({}, function (err2, results) {
        res.send(results);
      });
    }
  );
});

app.get("/singlestudent/:id", function (req, res) {
  let id = req.params.id;
  Student.findById(id, function (err, result) {
    if (err) console.log(err);
    res.send(result);
  });
});
