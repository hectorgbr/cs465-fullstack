/* GET news view */
const news = (req, res) => {
    res.render('news', { title: "News", currentRoute: 'news' });

};

module.exports = {
    news
}
