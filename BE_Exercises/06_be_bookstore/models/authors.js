import { Schema, model } from "mongoose";

const authorSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
    match: /^[A-Za-z\s]{3,}$/,
    message: "Please provide a valid name",
  },

  birthdate: Date,

  email: {
    type: String,
    unique: [true, "Email already in use!"],
  },

  bio: {
    type: String,
    maxlength: 1000,
  },

  website: {
    type: String,
    maxlength: 200,
    match: [
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/,
      "Please provide a valid URL",
    ],
    },

});


//virtual property for age out birthdate
authorSchema.virtual('age').get(function () {
    const birthdate = new Date(this.birthdate);
    const diff = Date.now() - birthdate.getTime();
    const age = Math.floor(diff / (3600_000 * 24 * 365.25));
    return age;
})

export const Author = model("Author", authorSchema);
