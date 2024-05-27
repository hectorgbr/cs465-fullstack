/* GET meals view */
const meals = (req, res) => {
    res.render('meals', { title: "Meals", currentRoute: 'meals' });

};

module.exports = {
    meals
}
