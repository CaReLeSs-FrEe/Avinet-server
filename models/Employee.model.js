const mongoose = require("mongoose");
const { Schema, model, ObjectId } = mongoose;

const EmployeeSchema = new Schema({
  userProfileId: { type: ObjectId, ref: 'Users' },
  licenses: String,
  objective: String,
  empId: {
    type: String,
    default: () => nanoid()
});

const Employee = model('Employee', schema);
