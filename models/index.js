const Traveller = require('./traveller');
const Location = require('./location');
const Trip = require('./trip');

Traveller.belongsToMany(Location, {
    through:"Trip",
    foreignKey: 'Traveller_id',
    onDelete: 'CASCADE',
});


Location.belongsToMany(Traveller, {
    through:"Trip",
    foreignKey: 'location_id',
    onDelete: 'CASCADE',
});


module.exports = { Traveller, Location, Trip };