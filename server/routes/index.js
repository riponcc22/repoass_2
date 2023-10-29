var express = require('express');
var router = express.Router();
let indexCntroller=require('../controllers/index');
//let contactController=require('../controllers/contactlist');
/* GET home page. */
router.get('/', indexCntroller.displayHomePage);
/* GET home page. */

router.get('/home', indexCntroller.displayHomePage);

/* GET About Us page. */
router.get('/about', indexCntroller.displayAboutPage);

router.get('/projects', indexCntroller.displayProjectPage);
/* GET Services page. */
router.get('/services', indexCntroller.displayServicePage);

/* GET Contact Us page. */
router.get('/contact', indexCntroller.displayContactPage);

/* GET contact list page. */
router.get('/Business Contact', indexCntroller.displayContactlistPage);

/* Get to display the  login page  -create operation*/

router.get('/login', indexCntroller.displayLoginPage);

/* PoST route for processing the login page  ---processing operation  */
router.post('/login', indexCntroller.processLoginPage);

/* Get to display the  login page  -create operation*/

module.exports = router;
