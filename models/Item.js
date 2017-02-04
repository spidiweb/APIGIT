// grab the things we need
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a schema
var itemSchema = new Schema({
    
});

itemSchema.pre('save', function (next) {

    var date = new Date();
    if (!this.CreateDate) {
        this.CreateDate = date;
    }

    this.UpdateDate = date;
    next();
});


// the schema is useless so far
// we need to create a model using it
var item = mongoose.model('Item', itemSchema);

// make this available to our users in our Node applications
module.exports = item;