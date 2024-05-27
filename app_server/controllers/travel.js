var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));

/* GET travel view */
const travel = (req, res) => {
    res.render('travel', { title: "Travel", currentRoute: 'travel', trips });
};

module.exports = {
    travel
};
