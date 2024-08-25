const mongoose = require('mongoose');
const Schema = mongoose.Schema

const taskSchema = new Schema({
    title:{
        required: true,
        type: String
    },
    isDone:{
        required: true,
        type: Boolean,
        default: false
    }


})
const Task = mongoose.model('Task', taskSchema);
module.exports = Task
