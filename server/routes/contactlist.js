const express = require('express');
const router = express.Router();
const passport = require('passport');

const contactController = require('../controllers/contactlist');

// Authentication guard
function requireAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

// Display the Contact List (Read)
router.get('/', contactController.displayContactList);

// Optional test route
router.get('/api', (req, res) => {
    res.send('Express RESTful API');
});

// Display Add Contact Page (Create)
router.get('/add', requireAuth, contactController.displayAddPage);

// Process Add Contact Form (Create)
router.post('/add', requireAuth, contactController.processAddPage);

// Display Edit Page (Update)
router.get('/edit/:id', requireAuth, contactController.displayEditPage);

// Process Edit Form (Update)
router.post('/edit/:id', requireAuth, contactController.processEditPage);

// Delete Contact (Delete)
router.get('/delete/:id', requireAuth, contactController.performDelete);

module.exports = router;

