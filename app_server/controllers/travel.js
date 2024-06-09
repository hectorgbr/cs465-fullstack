
const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
    method: 'GET',
    headers: {
    'Accept': 'application/json'
    }
}

// var fs = require('fs');
// var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));

/* GET travel view */
const travel = async (req, res, next) => {
    // console.org('TRAVEL CONTROLLER BEGIN');
    await fetch(tripsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            // console.log(json)
            let message = null;
            if(!(json instanceof Array)){
                message = 'API lookup error';
                json = [];
            } else {
                if(!json.length){
                    message = 'No trips exist in our database!'
                }
            }
            res.render('travel', {title: 'Travlr Getaways', trips: json, message});
        })
        // There was an error in this line so I changed "e." to "err."
        .catch(err => res.status(500).send(err.message));
    // console.log('TRAVEL CONTROLLER ADTER RENDER');
};

module.exports = {
    travel
};
