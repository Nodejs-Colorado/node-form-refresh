// mongoose denpencies
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
// schema
var Name = new Schema({
    first : String
});
// model in mongo
mongoose.model('Name', Name);
// connect to mongo
mongoose.connect( 'mongodb://localhost/formtest');