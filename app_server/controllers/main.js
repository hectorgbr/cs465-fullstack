/* GET Homepage */
const index = (req, res) => {
    //res.render('index', {title: "Travlr Getaways"});
    // Render the index view, passing the title and setting the currentRoute variable to 'home'.
    // The currentRoute variable is used to determine which navigation item
    // should be highlighted in the header and footer.
    res.render('index', { title: "Travlr Getaways", currentRoute: 'home' });

};

module.exports = {
    index
};
