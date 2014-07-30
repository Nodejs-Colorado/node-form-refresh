var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Comment = new Schema({
    title : String,
});

mongoose.model('Comment', Comment);

mongoose.connect('mongodb://localhost/node-comment');