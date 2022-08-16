const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Создаем схему для таблицы cars

const bookingSchema = new Schema({


    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },

    // Дата создания
    date: {
        type: Date,
        default: Date.now,
    },



    // Автомобиль
    car: {
        type: Object,
        required: true,
    },

    // Клиент
    client: {
        type: Object,
        required: true,
    },

    // Начало брони
    booking_start: {
        type: String,
        default: '',
        required: true,
    },

    // Конец брони
    booking_end: {
        type: String,
        default: '',
        required: true,
    },


    booking_days: {
        type: String,
        default: '',
        required: true,
    },


    // Место выдачи
    place_start: {
        type: String,
        default: '',
        required: true,
    },


    // Место сдачи
    place_end: {
        type: String,
        default: '',
        required: true,
    },

    // Тариф
    tariff: {
        type: String,
        default: '',
        required: true,
    },


    // Комментарий
    comment: {
        type: String,
        default: '',
        required: true,
    },
    

});


// Создаем таблицу cars
module.exports = mongoose.model('bookings', bookingSchema);