const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const VolunteerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  faculty: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  bestQuality: {
    type: String,
    required: true
  },
  whyASII: {
    type: String,
    required: true
  },
  departments: {
    type: {},
    required: true
  },
  hoursPerWeek: {
    type: String,
    required: true
  },
  selectedDepartments: {
    type: Array,
    required: false
  },
  comments: {
    type: []
  },
  status: {
    type: String,
    default: 'guitarist' 
  }
});
VolunteerSchema.plugin(timestamps);

module.exports = mongoose.model("volunteers", VolunteerSchema);
