/* GET rooms view */
const rooms = (req, res) => {
    res.render('rooms', { title: "Rooms", currentRoute: 'rooms' });

};

module.exports = {
    rooms
};

