const express=require('express');
const addbooksRouter=express.Router();
const bookdata=require('../model/bookdata');
function router(nav){
addbooksRouter.get('/',function(req,res){
    res.render("addbooks.ejs",{
        nav,
        title:'Library'
      

    });
});
addbooksRouter.post('/add',function(req,res){
    var item={
        title:req.body.title,
        author:req.body.author,
        genre:req.body.genre,
        image:req.body.image
    }
    var book=bookdata(item);
    book.save();
    res.redirect('/books');
       
});
return addbooksRouter;
}
module.exports=router;

