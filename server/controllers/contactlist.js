let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Contacts = require('../models/contactlist');

module.exports.displayContactList=(req,res,next)=>{
    Contacts.find((err,ContactList)=>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('contactlist/list',{title:'Contact List', contactlist:ContactList});
        }
    });
}
module.exports.displayAddPage=(req,res,next)=>{

    res.render('contactlist/add',{title:'Add Contacts'});
}

module.exports.processAddPage=(req,res,next)=>{

    let newContact=Contacts({
        "Name":req.body.Name,
        "Contactnumber": req.body.Contactnumber,
        "Email": req.body.Email

    });

    Contacts.create(newContact,(err,Contacts)=>{
        if(err)
        {console.log(err)
        res.end(err);
        }
    
        //refresh contactlist
        else{
            res.redirect('/contactlist');
        }
    });
}
module.exports.displayEditPage=(req,res,next)=>{
    
    let id=req.params.id;
    Contacts.findById(id,(err,contactToEdit)=>{

        if(err){

            console.log(err)
            res.end(err);
        }

        else{
            res.render('contactlist/edit',{title:'Edit contact list',contactlist:contactToEdit});
        }
    });
}

module.exports.processEditPage=(req,res,next)=>{

    let id=req.params.id;
    let updateContact=Contacts({
           "_id":id,
           "Name":req.body.Name,
           "Contactnumber": req.body.Contactnumber,
           "Email": req.body.Email
    });
   Contacts.updateOne({_id:id}, updateContact,(err)=>{
       if(err){
   
           console.log(err)
           res.end(err);
       }
   
        //refresh contact list
        else{
           res.redirect('/contactlist');
       }
   });
   
   }
module.exports.performDelete=(req,res,next)=>{

    let id=req.params.id;
 
     Contacts.remove({_id:id},(err)=>{
    if(err){

        console.log(err)
        res.end(err);
    }

     //refresh contact list
     else{
        res.redirect('/contactlist');
    }
});

}