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
  const username = req.body.username
  const existing_user = users.filter(el => el.username == username)
  if (existing_user.length == 0){
    res.status(404).json({message: "The user is not registered!"});
  }
  const token = jwt.sign({ id: username}, "fingerprint_customer", { expiresIn: '5h' })

  return res.status(201).json({token});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  let isbn = req.params.isbn;
  if (isbn && !(Number(isbn).isNan()) && books[number]){
    books[isbn]["review"] = "ABC";
    res.status(200).json({books})
  }else{
    res.status(404).json({message:"ISBN code is not valid nor is not found!"});
  }


  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
