const express= require("express");
const authorsRouter=express.Router();
const fs = require("fs")
const upload = require("express-fileupload");
authorsRouter.use(upload());
const authordata=require('../model/authordata');
function router(nav){
   /* var authors=[
    {
        author:'Joseph Barbera',
        genre:'Cartoon , Comic Books , Comic Strips',
        img:"joseph.jpg"
    },
    {
        author:'J K Rowling',
        genre:'Fantasy  ,drama , young adult fiction , tragicomedy ,crime fiction',
        img:"jk.png"
    },
    {
        author:'Basheer',
        genre:'Novel , short story , essays , memoirs',
        img:"basheer.jpg"
    }
]*/
authorsRouter.get('/',function(req,res){
    authordata.find()
    .then(function(authors){
    res.render("authors",
    {
        nav,
        title:'Library',
        authors
    });
});

});
authorsRouter.get('/:id',function(req,res){
    const id=req.params.id
    authordata.findOne({_id:id})
    .then(function(author){
    res.render("author",
    {
        nav,
        title:'Library',
        author
    });
});

});

authorsRouter.get("/updateform/:id", (req, res) => {

    // access id of a single book
    const id = req.params.id;

    // find single book in Database
    authordata.findOne({ _id: id })
        .then(function(author) {

            res.render("updateauthor", {


                author
            });

        });

});

authorsRouter.post("/update/:id/:img", (req, res) => {

    // access id & image of a single author
    const id = req.params.id;
    var img = req.params.img;

    // if image is updated
    if (req.files) {

        // remove curent image
        fs.unlink("./public/images/" + img, (err) => {
            if (err) {
                console.log(err);
            }
        });

        img = req.files.image.name;
        var file = req.files.image;

        // upload image to images-folder
        file.mv("./public/images/" + img, function(err) {
            if (err) {
                res.send(err);
            }
        });

    }

    // update author details
    authordata.updateOne({ _id: id }, {
            $set: {
                author: req.body.author,
                book: req.body.book,
                genre: req.body.genre,
                image: img,
                about: req.body.about
            }
        })
        .then(function(author) {
            // updated an author
        });

    // update Authors page
    res.redirect("/authors");

});



authorsRouter.get("/delete/:id/:img", (req, res) => {

    // access id of single book
    const id = req.params.id;
    var img = req.params.img;

    // find single book in Database
    authordata.deleteOne({ _id: id })
        .then(function(author) {
            // deleted one book from Library

            // remove image
            fs.unlink("./public/images/" + img, (err) => {
                if (err) {
                    console.log(err);
                }
            });

        });

    // update Books page
    res.redirect("/authors");

});
return authorsRouter;
}
module.exports=router;