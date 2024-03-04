const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a company name'],
        unique: true,
        trim: true,
        maxlength:[50, 'Name cannot be longer than 50 characters']
    },
    address:{
        type: String,
        required: [true, 'Please add an address']
    },
    website:{
        type: String,
        required: [true, 'Please add an website']
    },
    description:{
        type: String,
        required: [true, 'Please add an description']
    },
    tel: {
        type: String
    }
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

CompanySchema.pre('deleteOne', { document: true, query: false }, async function(next){
    console.log(`Interview appointments being removed from company ${this._id}`);
    await this.model('Appointment').deleteMany({company: this._id});
    next();
});

CompanySchema.virtual('appointments', {
    ref: 'Appointment',
    localField: '_id',
    foreignField: 'company',
    justOne: false
});

module.exports = mongoose.model('Company', CompanySchema);