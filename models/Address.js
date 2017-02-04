// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// A reasonable format for storing addresses would be as follows:

// Address Lines 1-4
// Locality
// Region
// Postcode (or zipcode)
// Country
// Address lines 1-4 can hold components such as:

// Building
// Sub-Building
// Premise number (house number)
// Premise Range
// Thoroughfare
// Sub-Thoroughfare
// Double-Dependent Locality
// Sub-Locality
var AddressSchema = new Schema({
    FirstName: String,
    LastName: String,
    Phone: String,
    AddressLine1: String,
    AddressLine2: String,
    AddressLine3: String,
    AddressLine4: String,
    City: String,
    NearestLandmark: String,
    CreateDate: Date,
    UpdateDate: Date
});

AddressSchema.pre('save', function (next) {

    var date = new Date();
    if (!this.CreateDate) {
        this.CreateDate = date;
        //this.method.generatePasswordSalt();
    }

    this.UpdateDate = date;
    next();
});


// the schema is useless so far
// we need to create a model using it
var address = mongoose.model('Address', AddressSchema);

// make this available to our users in our Node applications
module.exports = address;