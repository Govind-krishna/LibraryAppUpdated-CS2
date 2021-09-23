const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@ictakfiles.rdlsu.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority');

const Schema=mongoose.Schema;

const AuthorSchema=new Schema({
    author:String,
    genre:String,
    image:String
});

var authordata=mongoose.model('authordata',AuthorSchema);

module.exports=authordata;
