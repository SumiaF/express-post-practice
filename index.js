const express = require("express");

const { v4: uuid } = require("uuid");
const app = express();
const path = require("path");

const overrideM = require("method-override");
//to get data from the req body

app.use(express.urlencoded({ extended: true })); //without this line req.body will not provide data
app.use(express.json()); //if request body contains json

app.set("views", path.join(__dirname, "views")); //set path of views dir
app.set("view engine", "ejs"); //view engine setting
app.use(overrideM("_method")); // provide a way to use request which browser does not support directly
//sample data to be used
const comments = [
  {
    id: uuid(),
    username: "sana",
    comment: "that looks so funny",
  },
  { id: uuid(), username: "sabrena", comment: "I am so disappointed in you" },
  {
    id: uuid(),
    username: "laura",
    comment: "I want you to delete your account",
  },
  {
    id: uuid(),
    username: "Hano",
    comment: "Thank you for the favour of yours, very nice of u",
  },
];
//to render all the comments using ejs
app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

//get a particular comment
app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/byID", { comment });
});

app.post("/comments", (req, res) => {
  const { uname, comment } = req.body;
  comments.push({ username: uname, comment, id: uuid() });
  res.redirect("/comments"); //will automatically back to set route get "/comments"
});

//can be tested using postman
app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const editedText = req.body.update;
  console.log({ id, hmmm: req.body });
  //finding and replacing comment
  const findComment = comments.find((c) => c.id === id);
  findComment.comment = editedText;
  res.redirect("/comments");
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/update", { comment });
});
/* //posted data from user can be taken using request body
app.post("/mywork ", (req, res) => {
  //using req.body
  const { data } = req.body;
}); */

app.listen(8080, () => {
  console.log("I am listening on port 8080");
});
