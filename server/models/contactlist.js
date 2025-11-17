let mongoose = require('mongoose');

// create a model class

let ContactModel = mongoose.Schema({
    Name: String,
    Contactnumber: String,
    Address: String,
    Age: String,
    Sex: String,
    Email: String
},
{
collection:"contact"
});
module.exports = mongoose.model('contactlist',ContactModel);