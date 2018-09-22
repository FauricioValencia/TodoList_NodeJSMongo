const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema ({
    title: String,
    description: String,
    status: {
        type:Boolean,
        default:false
    }
})
//asi van a lucir la base de datos
module.exports = mongoose.model('tasks',TaskSchema);