// const mongoose = require('mongoose');

// const employeeSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, 'Name is required'],
//       trim: true,
//       minlength: [2, 'Name must be at least 2 characters long']
//     },
//     email: {
//       type: String,
//       required: [true, 'Email is required'],
//       unique: true,
//       lowercase: true,
//       trim: true,
//       match: [
//         /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//         'Please provide a valid email address'
//       ]
//     },
//     mobileno: {
//       type: String,
//       required: [true, 'Name is required'],
//     },
//     position: {
//       type: String,
//       required: [true, 'Position is required'],
//       trim: true
//     }
//   },
//   { timestamps: true }
// );

// // Middleware to handle duplicate email errors
// employeeSchema.post('save', function (error, doc, next) {
//   if (error.name === 'MongoServerError' && error.code === 11000) {
//     next(new Error('Email already exists'));
//   } else {
//     next(error);
//   }
// });

// module.exports = mongoose.model('Employee', employeeSchema);


const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please provide a valid email address',
      ],
    },
    mobileno: {
      type: String,
      required: [true, 'Mobile Number is required'],
      match: [/^\d{10}$/, 'Mobile Number must be a valid 10-digit number'],
    },
    designation: {
      type: String,
      enum: ['HR', 'Manager', 'Sales', 'Designer', 'Developer'],
      required: [true, 'Designation is required'],
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      required: [true, 'Gender is required'],
    },
    course: {
      type: [String],
      enum: ['MCA', 'BCA', 'BSC', 'MSC', 'BE', 'ME', 'B Com', 'M Com'],
      required: [true, 'At least one course is required'],
    },
    profile: {
      type: String,
      required: [true, 'Image upload is required'],
      match: [/.*\.(jpg|png)$/, 'Only JPG and PNG file formats are allowed'],
    },
  },
  { timestamps: true }
);

// Middleware to handle duplicate email errors
employeeSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('Email already exists'));
  } else {
    next(error);
  }
});

module.exports = mongoose.model('Employee', employeeSchema);
