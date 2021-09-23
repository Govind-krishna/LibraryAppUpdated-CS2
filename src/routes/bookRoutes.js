const express= require("express");
const booksRouter = express.Router();
const fs = require("fs");

const upload = require("express-fileupload");
booksRouter.use(upload());
const bookdata=require('../model/bookdata');
function router(nav){
/*var books=[
    {
        title:'Tom and Jerry',
        author:'Joseph Barbera',
        genre:'Cartoon',
        img:"tom.jpg"
    },
    {
        title:'Harry Potter',
        author:'J K Rowling',
        genre:'Fantasy',
        img:"harry.jpg"
    },
    {
        title:'Paathumayude Aadu',
        author:'Basheer',
        genre:'Drama',
        img:"pathumayude-adu.png"
    }
]*/
booksRouter.get('/',function(req,res){
    bookdata.find()
    .then(function(books){
    res.render("books.ejs",{
        nav,
        title:'Library',
        books
    });

    });
});
booksRouter.get('/:id',function(req,res){
    const id = req.params.id
    bookdata.findOne({_id:id})
    .then(function(book){
    res.render('book',{
        nav,
        title:'Library',
        book
    });

    });
});

booksRouter.get("/updateform/:id", (req, res) => {

    // access id of a single book
    const id = req.params.id;

    // find single book in Database
    bookdata.findOne({ _id: id })
        .then(function(book) {

            res.render("updateBook", {
                nav,
                title: "Update a Book",
                book
            });

        });

});

    // update a book

    booksRouter.post("/update/:id/:img", (req, res) => {

        // access id & image of a single book
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

        // update book details
        bookdata.updateOne({ _id: id }, {
                $set: {
                    title: req.body.title,
                    author: req.body.author,
                    genre: req.body.genre,
                    image: img,
                    about: req.body.about
                }
            })
            .then(function(book) {
                // updated a book
                console.log('Book updated');
            });

        // update Books page
        res.redirect("/books");

    });

    booksRouter.get("/delete/:id/:img", (req, res) => {

        // access id of single book
        const id = req.params.id;
        var img = req.params.img;

        // find single book in Database
        bookdata.deleteOne({ _id: id })
            .then(function(book) {
                // deleted one book from Library

                // remove image
                fs.unlink("./public/images/" + img, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });

            });

        // update Books page
        res.redirect("/books");

    });
return booksRouter;
}

module.exports=router;

