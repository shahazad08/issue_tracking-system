const mongoose = require('mongoose');

const Students = mongoose.Schema({
    cic_id:{
        type:String,
        required:true,
        unique:true
    },
    engineer_name: {
        type:String,
        required:true
    },
    issue_type: { 
        type:[String],
        required:true,
    },
    issue_description: {
        type:String,
        required:true
    },
    additional_information: {
        type:String,
    },
    productImage:{
        type:String,
      //  required:true
    }

}, {
    timestamps: true
});

// db.users.update({}, {$rename:{"first_name":"engineer_name"}}, false, true);

module.exports = mongoose.model('Student', Students);