let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport=require('passport');


let contactController=require('../controllers/contactlist');

/*function requireAuth(req,res,next){

    if (!req.isAuthenticated())
    
    {
        return res.redirect('/login');
     }
next();
}
*/

/* get route for productlist page-read operation*/
router.get('/', contactController.displayContactList);

/* get route for displaying add page-Create operation*/
router.get('/add', contactController.displayAddPage);

/* get route for processing add page-Create operation*/
router.post('/add', contactController.processAddPage);


/* get route for displaying Edit page-Update operation*/

router.get('/edit/:id', contactController.displayEditPage);

/* get route for processing Edit page-Update operation*/
router.post('/edit/:id', contactController.processEditPage);

/* get route to perform deletion-Delete operation*/

router.get('/delete/:id', contactController.performDelete);

module.exports = router;
