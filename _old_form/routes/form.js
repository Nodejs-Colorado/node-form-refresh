// dependencies
var mongoose = require('mongoose');
var Name = mongoose.model( 'Name' );

// GET request
exports.myForm = function ( req, res ){
  Name.find( function ( err, names){
    console.log(names)
    res.render( 'form', {
        title : 'Dan\'s Form',
        names : names
    });
  });
};

// POST request
exports.create = function ( req, res ){
  new Name({
    first : req.body.name
  }).save( function( err, name){
    res.redirect( '/form' );
  });
};