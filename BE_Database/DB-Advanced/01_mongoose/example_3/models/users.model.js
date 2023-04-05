import mongoose from "mongoose";

/**
 * schema for users
 *  firstname   => String, Required, Alphabets-Only, min-3 char
 *  lastname    => String, Required, Alphabets-Only, min-3 char
 *  birthdate   => Date, Required
 *  username    => String, Required, Unique Alphabets/Digits/Special, min-5 char
 *  email       => String, Required, Unique, should be email
 *  password    => String, Required, Alphabets/Digits/Special, min-8 char
 *  role        => String, Enum['Admin', 'User']
 *
 */

export const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "firstname is required!"],
    match: [/^[A-Za-z]{3,}$/, "firstname is not valid!"],
  },

  lastname: {
    type: String,
    required: [true, "firstname is required!"],
    // match: [/^[A-Za-z]{3,}$/, "lastname is not valid!"],
  },

  birthdate: {
    type: Date,
    required: [true, "birthdate is required field!"],
    // separator: "/",
  },

  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "This username already exist"],
    match: [/^[A-Za-z]+[\w\W]{4,}$/, "username is not valid"],
  },

  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "This email already exist"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "email is not valid",
    ],
  },

  password: {
    type: String,
    required: [true, "Password is required!"],
    match: [/^[\w\W]{8,}$/, "Password is not valid!"],
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

/**
 * 1. Create a virtuals for fullname
 * 2. Create a custom-method to get the User's age
 * 3. Create a statics to get the list of Admins
 */

/** Task1 - Virtual */
userSchema.virtual('fullname').get(function() {
    return `${this.lastname}, ${this.firstname}`
})



/** Task2 - Custom Method */
userSchema.methods.getAge = function() {
    let ageInMs = Date.now() - this.birthdate.getTime();
    let ageInYears = parseInt(ageInMs / (1000 * 60 * 60 * 24 * 365));
    return ageInYears;
}

/** Task3 - Statics*/
userSchema.statics.getAdmins = function() {
    return this.find({role: 'admin'})
}

//generate model
export default mongoose.model("User", userSchema);
