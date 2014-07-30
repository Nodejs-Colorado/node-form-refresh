// dependencies
var mongoose = require('mongoose');
var Day = mongoose.model('Day');

// GET request
exports.caught = function ( req, res ){
  Day.find( function ( err, days){
    console.log(days)
    res.render( 'form', {
        title : 'Dan\'s Form',
        days : days
    });
  });
};

// POST request
exports.create = function ( req, res ){
  new Day({
    day_name : req.body.day
  }).save( function( err, day){
    res.redirect( '/form' );
  });
};