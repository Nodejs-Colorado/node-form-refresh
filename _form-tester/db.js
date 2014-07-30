// mongoose dependencies
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
// schema
var Day = new Schema({
    day_name : String
});
// model in mongo
mongoose.model('Day', Day);
// connect to mongo
mongoose.connect( 'mongodb://localhost/form-tester');