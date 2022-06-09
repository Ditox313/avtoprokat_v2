const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Создаем схему для таблицы positions

const carSchema = new Schema({

    // Марка
    marka: {
        type: String,
        required: true,
    },


    // Модель
    model: {
        type: String,
        required: true,
    },


    // Номер
    number: {
        type: String,
        required: true,
    },

    // Пробег
    probeg: {
        type: String,
        required: true,
    },



    // Стоимость
    price: {
        type: String,
        required: true,
    },



    // Начало аренды
    start_arenda: {
        type: String,
        required: false,
    },


    // Конец аренды
    end_arenda: {
        type: String,
        required: false,
    },


    // Владелец
    vladelec: {
        type: String,
        required: true,
    },


    // Статус
    status: {
        type: String,
        required: true,
    },


    // Категория
    category: {
        type: String,
        required: true,
    },



    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },




    // Создаем поле изображения юзера
    previewSrc: {
        type: String,
        default: '',
        required: false,
    },


    date: {
        type: Date,
        default: Date.now,
    },






    // // Создаем поле с ID категории
    // category: {
    //     ref: 'categories',
    //     type: Schema.Types.ObjectId
    // },


    // Создаем поле с ID юзера

});


// Создаем таблицу positions
module.exports = mongoose.model('cars', carSchema);