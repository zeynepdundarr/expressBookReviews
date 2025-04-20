const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});


// TODO: Sample get endpoint
// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(users, null, 4);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  return res.send(books[1])
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author
  if (author){
    let filtered =  Object.fromEntries(Object.entries(books).filter(([_,value]) => value["author"]===author));
    if (filtered){
      return res.json({filtered});
    }else{
      return res.status(404).json({message: "No books found for this author"});
    }
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title
  if (title){
    let filtered =  Object.fromEntries(Object.entries(books).filter(([_,value]) => value["title"]===title));
    if (filtered){
      return res.json({filtered});
    }else{
      return res.status(404).json({message: "No books found for this itle"});
    }
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn
  if (isbn && books[Number(isbn)] && books[Number(isbn)]["reviews"]){
    const book_rev = books[Number(isbn)]["reviews"];
    return res.json({book_rev})
  }else{
    return res.status(404).json({message: "ISBN invalid or no books found by this isbn"});
  }
});

module.exports.general = public_users;
