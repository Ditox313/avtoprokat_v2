const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Создаем схему для таблицы pays

const paySchema = new Schema({

    // Юзер
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },

    // Дата создания
    date: {
        type: Date,
        default: Date.now,
    },


    // Сумма
    summ: {
        type: String,
        required: true,
    },

    // Вид платежа(за что)
    vid: {
        type: Object,
        required: true,
    },

    // Бронь ID
    bookingId: {
        type: String,
        required: true,
    },



});


// Создаем таблицу cars
module.exports = mongoose.model('pays', paySchema);