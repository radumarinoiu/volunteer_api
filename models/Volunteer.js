const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const VolunteerSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber:{
    type:String,
    required:true
  },
  faculty: {
    type: String,
    required: true
  },
  yearOfStudy: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  bestQuality: {
    type: String,
    required:true
  },
  whyASII: {
    type: String,
    required:true
  },
  departments: {
    type:{},
    required:true
  },
  descriptionOfDepartments: {
    type:String,
    required:true
  },
  hoursPerWeek: {
    type:Number,
    required:true
  }
});
VolunteerSchema.plugin(timestamps);

module.exports = mongoose.model("volunteers", VolunteerSchema);
