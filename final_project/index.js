const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());


app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))


// disable authentication temporarily
app.use("/customer/auth/*", function auth(req,res,next){

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) return res.sendStatus(401);

    jwt.verify(token, "fingerprint_customer", (err, user ) => {
        if (!err){
            req.user = user;
             // proceed to next middleware
            next();
        }else{
            res.status(403).json({message: "User is not authenticated"});
        }
    });
});

const PORT=5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
