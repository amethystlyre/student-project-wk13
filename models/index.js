const Traveller = require('./Traveller');
const Location = require('./Location');
const Trip = require('./Trip');

Traveller.belongsToMany(Location, {
    through: {
        model: Trip,
        unique: false
    },
    as: 'destinations'
});


Location.belongsToMany(Traveller, {
    through: {
        model: Trip,
        unique: false
    },
    as: 'tourists'
});

Traveller.hasMany(Trip);
Trip.belongsTo(Traveller);
Location.hasMany(Trip);
Trip.belongsTo(Location);



module.exports = { Traveller, Location, Trip };