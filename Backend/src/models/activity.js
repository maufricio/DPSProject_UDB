const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    activityId : {
        type: String,
        required : true
    },
    name:{
        type: String,
        required : true
    },
    description:{
        type: String,
        required : true
    },
    date:{
        type: Date,
        required : true
    },
    state:{
        type: Boolean,
        required : true
    }
},{ timestamps: true }); //timestamps: true, crea un campo de fecha de creación y modificación en el documento de la base de datos.

module.exports = mongoose.model('Activity',activitySchema);