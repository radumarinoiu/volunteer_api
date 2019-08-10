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
  emailVerification: {
    type: Boolean,
    default: false
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
  bestQulity: {
    type: String
  },
  whyASII: {
    type: String
  },
  departments: [String],
  descriptionOfDepartments: [String],
  hoursPerWeek: Number
});
VolunteerSchema.plugin(timestamps);

module.exports = mongoose.model("volunteers", VolunteerSchema);
