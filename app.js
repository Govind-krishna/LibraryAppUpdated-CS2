const express= require("express");
const app=express();
//const port = process.env.PORT || 3000;

const nav=[
    {
        link:'/books',name:'Books'
    },
    {
        link:'/authors',name:'Authors'
    },
    {
        link:'/signup',name:'Signup'
    },
    {
        link:'/login',name:'Login'
    },
    {
        link:'/addbooks',name:'Add books'
    },
    {
        link:'/addauthors',name:'Add authors'
    }

   
];
const booksRouter=require('./src/routes/bookRoutes')(nav);
const authorsRouter=require('./src/routes/authorRoutes')(nav);
const addbooksRouter=require('./src/routes/addbooksroutes')(nav);
const addauthorsRouter=require('./src/routes/addauthorsroutes')(nav);
const loginRouter=require('./src/routes/loginroutes')(nav);
const signupRouter=require('./src/routes/signuproutes')(nav);

app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views',__dirname+'/src/views');
app.use('/books',booksRouter);
app.use('/authors',authorsRouter);
app.use('/signup',signupRouter);
app.use('/login',loginRouter);
app.use('/addbooks',addbooksRouter);
app.use('/addauthors',addauthorsRouter);


app.get('/',function(req,res){
    res.render("index",
    {
        nav,
        title:'Library'

    });
});

app.get('/signup',function(req,res){
    res.render("signup",
    {
        nav,
        title:'Library'

    });
});
app.get('/login',function(req,res){
    res.render("login",
    {
        nav,
        title:'Library'

    });
});
app.get('/addbooks',function(req,res){
    res.render("addbooks",
    {
        nav,
        title:'Library'

    });
});
app.get('/addauthors',function(req,res){
    res.render("addauthors",
    {
        nav,
        title:'Library'

    });
});





//app.listen(port,()=>{console.log("Server Ready at" + port)});
app.listen(3000);

