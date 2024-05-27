/* GET contact view */
const contact = (req, res) => {
    res.render('contact', { title: "Contact", currentRoute: 'contact' });
    
};

module.exports = {
    contact
}
