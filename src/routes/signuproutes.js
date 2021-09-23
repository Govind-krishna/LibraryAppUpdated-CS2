const express=require('express');
const signupRouter=express.Router();

const bodyParser = require('body-parser');
const alert = require('alert');
const { check, validationResult } = require('express-validator');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const Accountdata = require("../model/Accountdata");

function router(nav){
signupRouter.get('/',function(req,res){
    res.render("signup.ejs",{
        nav,
        title:'Library'
      

    });
});

//add an account
signupRouter.post("/register", (req,res) => {
    var password = req.body.password;
    var email = req.body.email;
    var regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z0-9]{3,5})+.([a-zA-Z0-9]{3,5})$/

    //email format validation
    if(regexp.test(email)){
        //valid email

        //password format validation
        if(password.match(/[a-z]/g) &&  password.match(/[A-Z]/g) && password.match(/[0-9]/g) && password.match(/[^a-zA-Z\d]/g) && password.length >= 8){
            //valid password

            //new account
            var accnt = {
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            }

            //pass to AccountSchema
            var account = Accountdata(accnt);

            //save new account to database
            account.save();

            //redirect to login page
            res.redirect("/login");

            alert("Your account is ready. Login now");
        }
        else{
            //invalid password
            alert("Password must contain 8 characters including atleast one lowercase, one uppercase, one digit and one special character");
        }
    }
    else{
        //invalid email
        alert("Invalid Email !!  (eg:- abcd@gmail.com)");
    }
})

return signupRouter;
}
module.exports=router;