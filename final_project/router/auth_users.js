const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{username: "zeynep"}];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const user = req.user
  const existing_user = users.filter(el => el.username == user)
  if (existing_user.length == 0){
    res.status(404).json({message: "The user is not registered!"});
  }
  const token = jwt.sign({ id: user}, "fingerprint_customer", { expiresIn: '5h' })

  return res.status(201).json({token});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  let isbn = req.params.isbn;
  let user = req.user;
  let review = req.body.review;

  if (!isNaN(isbn) && books[isbn]){
    // handle unique review adding for user
    books[isbn]["reviews"][user.id] = review;
    res.status(200).json({books})
  }else{
    res.status(404).json({message:"ISBN code is not valid nor is not found!"});
  }
});

regd_users.get("/auth/review/:isbn", (req, res) => {
  let isbn = req.params.isbn;
  if (!isNaN(isbn) && isbn in books[number]){
  let reviews_by_isbn = books[isbn];
    res.status(200).json({reviews_by_isbn})
  }else{
    res.status(404).json({message:"ISBN code is not valid nor is not found!"});
  }
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  let user= req.user
  let isbn = req.params.isbn;
  if (!isNaN(isbn) && books[isbn]){
    books[isbn]["reviews"][user.id] = {};
    let updated = books[isbn]["reviews"]
    res.status(200).json({updated})
  }else{
    res.status(404).json({message:"ISBN code is not valid nor is not found!"});
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
