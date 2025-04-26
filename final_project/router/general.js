const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

const public_users = express.Router();

public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password){
    const existing_user = users.filter(el => el.username == username)
    if (existing_user.length > 0){
      res.status(404).json({message: "The user already exists!"});
    }else{
      users.push({username: username, password: password});
      res.status(200).json({message: `The user ${username} is registered!`});
    }
  }else{
    res.status(403).json({message: "Please provide correct username and password"});
  }
});

// TODO: Sample get endpoint
// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(users, null, 4);
});

public_users.get('/promise',function (req, res) {
  //Write your code here
  let my_promise = new Promise((resolve, reject) => {
    resolve(books);
  })

  my_promise.then((return_object)=>{
    return res.send(return_object, null, 4)
  })
});

public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(books, null, 4);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  return res.send(books[1])
 });

 // Get book details based on ISBN
 public_users.get('/promise-isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn; // <-- You forgot to define isbn

  let promise = new Promise((resolve, reject) => {
    if (!isNaN(isbn) && books[isbn]) {
      resolve(books[Number(isbn)]);
    } else {
      reject("isbn is not valid!");
    }
  });

  promise.then((retrievedBook) => {
    if (retrievedBook) {
      return res.json({ retrievedBook });
    } else {
      return res.status(404).json({ message: "No books found for this isbn" });
    }
  }).catch((err) => {
    res.status(400).json({ error: err });
  });
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

public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author
  if (author){
    const filtered =  Object.fromEntries(Object.entries(books).filter(([_,value]) => value["author"]===author));
  }

  // check operation is after promise is retrieved, since it is a async operaiton
  if (Object.keys(filtered).length > 0){
    return res.json({filtered});
  }else{
    return res.status(404).json({message: "No books found for this author"});
  }
});

public_users.get('/author2/:author',function (req, res) {
  //Write your code here
  let promise = new Promise((resolve, reject) => {
    const author = req.params.author
    if (author){
      const filtered =  Object.fromEntries(Object.entries(books).filter(([_,value]) => value["author"]===author));
      resolve(filtered)
    }
  })
  // check operation is after promise is retrieved, since it is a async operaiton
  promise.then((filtered) => {
    if (Object.keys(filtered).length > 0){
      return res.json({filtered});
    }else{
      return res.status(404).json({message: "No books found for this author"});
    }
  }).catch((err) => {
    res.status(400).json({error: err}) 
  })
});

public_users.get('/title2/:title', function (req, res){
    let promise = new Promise((resolve, reject) => {
      const title = req.params.title
      if (title){
        let filtered =  Object.fromEntries(Object.entries(books).filter(([_,value]) => value["title"]===title));
        resolve(filtered)
      }
    })
    promise.then((filtered) => {
      if (Object.keys(filtered).length > 0){
        return res.json({filtered});
      }else{
        return res.status(404).json({message: "No books found for this title"});
      }
    })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title
  if (title){
    let filtered =  Object.fromEntries(Object.entries(books).filter(([_,value]) => value["title"]===title));
    if (Object.keys(filtered).length > 0){
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
  if (!isNaN(isbn) && books[isbn]){
    const book_rev = books[Number(isbn)]["reviews"];
    return res.json({book_rev})
  }else{
    return res.status(404).json({message: "ISBN invalid or no books found by this isbn"});
  }
});

module.exports.general = public_users;


