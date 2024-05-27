/* GET about view */
const about = (req, res) => {
    res.render('about', { title: "About", currentRoute: 'about' });

};

module.exports = {
    about
}
