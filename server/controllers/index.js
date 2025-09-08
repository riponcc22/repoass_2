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
  };

// module.exports.processLoginPage=(req,res,next)=>{


//      res.redirect('/contactlist');
//  };

// module.exports.processLoginPage = (req, res, next) => {
//     passport.authenticate('local', (err, user, info) => {
//         if (err) {
//             console.error("Auth error:", err);
//             return res.status(500).render('error', { title: 'Error', message: 'Server error' });
//         }

//         if (!user) {
//             req.flash('loginMessage', 'Invalid username or password');
//             return res.redirect('/login');
//         }

//         req.login(user, (err) => {
//             if (err) {
//                 console.error("Login error:", err);
//                 return res.status(500).render('error', { title: 'Error', message: 'Server error' });
//             }

//             req.flash('successMessage', 'Login successful');
//             return res.redirect('/contactlist');  
//         });
//     })(req, res, next);
// };

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
     // server error
     if(err)
     {
        return next(err);
     }
     // is ther a user login error?
     if(!user)
     {
        req.flash('loginMessage', 'Authentication Error');
        return res.redirect('/login');
     }
     req.login(user, (err) => {
        // server error?
        if(err)
        {
            return next(err);
        }
        return res.redirect('/contactlist');
     });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) =>{
    //checlk if the user is not already logged in
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
};

// module.exports.processRegisterPage = (req, res, next) => {
//     let newUser = new User({
//         username: req.body.username,
//         email: req.body.email,
//         displayName: req.body.displayName
//     });

//     User.register(newUser, req.body.password, (err) => {
//         if (err) {
//             return res.status(400).json({ message: 'Registration error', error: err });
//         }
//         return passport.authenticate('local')(req, res, () => {
//             return res.json({ message: 'Registration successful' });
//         });
//     });
// };

// module.exports.processRegisterPage = (req, res, next) => {
//     let newUser = new User({
//         username: req.body.username,
//         email: req.body.email,
//         displayName: req.body.displayName
//     });
//     User.register(newUser, req.body.password, (err) => {
//         if (err) {
//             console.log("Error: Inserting New User");
//             if (err.name == "UserExistsError") {
//                 req.flash(
//                     'registerMessage',
//                     'Registration Error: User Already Exists!'
//                 );
//                 console.log('Error: User Already Exists!');
//             }
//             return res.redirect('/register');
//         }
//         return passport.authenticate('local')(req, res, () => {
//             return res.redirect('/contactlist');
//         });
//     });
// } ;

module.exports.processRegisterPage = (req, res, next) =>{
    // instantiate a user object

    let newUser = new User({
        username: req.body.username,
        //password: req.body.password
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err, ) => {
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registraion Error: User Already Exists'
                );
                console.log('Error: User Already Exists!')
            }
            return res.render('auth/register', 
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else
        {
            // if no error exist, then registration is successful

            // redirect the user and authenticate them

            return passport.authenticate('local')(req, res, () => {
                res.redirect('/contactlist')
            });
        }
    });
}


module.exports.performLogout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
}





