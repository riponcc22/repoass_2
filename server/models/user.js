let mongoose = require('mongoose');
let passportLocalMongoose=require('passport-local-mongoose');
// create a model class

let User = mongoose.Schema({
    username:
    {
    type:String,
    default:'',
    trim:true,
    required:'username is required'


    },
    
    password:
    {
    type:String,
    default:'',
    trim:true,
    required:'password  is required'


    },
    email:
    {
    type:String,
    default:'',
    trim:true,
    required:'email  is required'


    }


    /*username: String,
    password: String,
    email:String*/
},

    
{
    collection:"users"
});

//configure options for user model

let options=({missingPasswordError:'wrong / missing Password'});

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('user', User);
