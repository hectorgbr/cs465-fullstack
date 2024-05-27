var express = require('express');
var router = express.Router();
var controller = require('../controllers/travel');

const ctrlAbout = require('../controllers/about');

/* GET travel page. */
router.get('/', controller.travel);

module.exports = router;

/* GET about page. */
router.get('/about', (req, res) => {
    res.render('about', { title: 'About', activePage: 'about' });
});