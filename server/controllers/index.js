let express = require('express');
let router = express.Router();
let mongoose=require('mongoose');
let passport = require('passport');

let userModel=require('../models/user');

let User=userModel.User;

module.exports.displayHomePage=(req,res,next)=>
{ res.render('index',{title:'Home'});
}

module.exports.displayAboutPage=(req, res, next) =>{
    res.render('about', { title: 'About'});
  }


  module.exports.displayProjectPage=(req, res, next) =>{
    res.render('projects', { title: 'Projects'});
  }
  
  module.exports.displayServicePage=(req, res, next)=> {
    res.render('services', { title: 'Services'});
  };

  module.exports.displayContactPage=function(req, res, next) {
    res.render('contact', { title: 'Contact'});
  };

  module.exports.displayContactlistPage=(req, res, next) =>{
    res.render('contactlist', { title: 'Business Contact'});
  }

  module.exports.displayLoginPage=(req,res,next)=>{
    
    if(!req.user)
    {
    res.render('auth/login',
    {
     title:"Login",
     messages: req.flash('loginMessage'),
     displayName: req.user ? req.user.displayName:''
    })
}

  else
  {
   return res.redirect('/');
  }
}
/*module.exports.processLoginPage=(req,res,next)=>{

  
  
  passport.authenticate('local',(err,user,info)=>{

    if(err)
    {return next(err);}

    if(!user)
    {
    req.flash('loginMessage','Authentication Error');
    
    return res.redirect('/login');

    }
    req.login(user,(err)=>{
      if(err)
      {
        return next(err);
      }
      return res.redirect('/contactlist');
    });
  })(req,res,next);
}*/

module.exports.processLoginPage=(req,res,next)=>{


     res.redirect('/contactlist');
 };