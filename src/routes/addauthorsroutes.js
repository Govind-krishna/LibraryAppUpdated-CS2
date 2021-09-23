/*const express=require('express');
const addauthorsRouter=express.Router();
function router(nav){
addauthorsRouter.get('/',function(req,res){
    res.render("addauthors.ejs",{
        nav,
        title:'Library'
      

    });
});
return addauthorsRouter;
}
module.exports=router;*/


const express=require('express');
const addauthorsRouter=express.Router();
const authordata=require('../model/authordata');
function router(nav){
addauthorsRouter.get('/',function(req,res){
    res.render("addauthors.ejs",{
        nav,
        title:'Library'
      

    });
});
addauthorsRouter.post('/add1',function(req,res){
    var item={
        author:req.body.author,
        genre:req.body.genre,
        image:req.body.image
    }
    var author=authordata(item);
    author.save();
    res.redirect('/authors');
    
    
    
       
});
return addauthorsRouter;
}
module.exports=router;

