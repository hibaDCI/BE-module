import mongoose from 'mongoose';
import { userSchema } from './users.model.js';

//create schema for task
// title string required only alphabet
// deadline date required
// status string enum['on-going','canceled', 'done', 'paused'] required default on-going
// desc string only alphabet
// assignee [users] required

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "The title for a task is required!"],
    match: [/^[A-Za-z\s\w]{3,}$/, "The title is not valid"],
  },
  deadline: {
    type: Date,
    required: [true, "The deadline for a task is required!"],
  },

  status: {
    type: String,
    enum: ["ongoing", "canceled", "done", "paused"],
    required: [true, "The status for a task is required!"],
    default: "ongoing",
  },

  desc: {
    type: String,
    match: [/^[A-Za-z\s\w]{5,}$/, "The description is not valid!"],
  },

  assignee: [userSchema],
});

export default mongoose.model('Task', taskSchema);