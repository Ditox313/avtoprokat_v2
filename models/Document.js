const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const documentSchema = new Schema({


    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },

    // Дата создания
    date: {
        type: Date,
        default: Date.now,
    },


    // Порядковый номер
    order: {
        type: Number,
        required: true,
    },


    content: {
        type: String,
        required: true,
    },


    // Клиент
    client: {
        type: Object,
        required: true,
    },


    

});



module.exports = mongoose.model('documents', documentSchema);