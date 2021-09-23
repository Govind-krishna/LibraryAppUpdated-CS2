const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://userone:userone@ictakfiles.rdlsu.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    name: String,
    email: String,
    username: String,
    password: String
});

var Accountdata = mongoose.model("accountdata", AccountSchema);

module.exports = Accountdata;
