const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());


// disable authentication for a moment
app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){


if (req.session.authorization){
    let token = req.session.authorization['accessToken']
    jwt.verify(token, "access", (err, user ) => {
        if (!err){
            req.user = user;
            res.send.stats(200).json({message: "user is authenticated"});
            // proceed to next middleware
            next();
        }else{
            //
            res.send.stats(403).json({message: "user is not authenticated"});
        }
    });
}else{
    // return error if no token is found for the user
    return res.status(404).json({message:"User is not logged in"});
}}
);

const PORT=5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
