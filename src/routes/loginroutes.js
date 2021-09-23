const express=require('express');
const loginRouter=express.Router();
const alert = require("alert");

//import AccountSchema
const AccountSchema = require("../model/Accountdata");
const Accountdata = require('../model/Accountdata');


function router(nav){
loginRouter.get('/',function(req,res){
    res.render("login.ejs",{
        nav,
        title:'Library'
      

    });

    loginRouter.post("/account",function(req,res){

        var username = req.body.username;
        var password = req.body.password;

        //find single account in database
        Accountdata.findOne({username: username})
        .then(function(account){

            //validate account
            if(account != null){
                const pass = account.password;

                //check password
                if(pass == password){
                    alert("Hai " + account.name + ", Welcome !");
                }
                else {
                    alert("Wrong Password!!");
                }
            }
            else{
                alert("Couldn't find account !! Please check your username and password");
            }
        });


        loginRouter.post("/reset",function(req,res){
            const email = req.body.email;
            var newpasswd = req.body.password;

            //validate account
            Accountdata.findOne({email: email})
            .then(function(book) {
                if(book != null){

                    //password format validation
                    if(newpasswd.match(/[a-z]/g) && newpasswd.match(/[A-Z]/g) && newpasswd.match(/[0-9]/g) && newpasswd.match(/[^a-zA-Z\d]/g) && newpasswd.length >= 8){
                        //valid password 

                        //update password
                        Accountdata.updateOne({email: email},{
                            $set: {
                                password: newpasswd
                            }
                        })
                        .then(function(updated){
                            alert("Your password has been updated, You can login with your new password");

                            //redirect to login page
                            res.redirect("login");
                        });
                    }
                    else{
                        //invalid password
                        alert("Password must contain minimum 8 characters including atleast one lowercase,one uppercase,one digit and one special character");
                    }
                }
                else{
                    alert("Couldn't find account!! Check your email address");
                }
            });
        });
    });
});
return loginRouter;
}
module.exports=router;
