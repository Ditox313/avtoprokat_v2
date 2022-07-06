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


    // VIN автомобиля
    vin: {
        type: String,
        required: false,
    },

    // Год выпуска
    year_production: {
        type: String,
        required: false,
    },

    // Пробег
    probeg: {
        type: String,
        required: false,
    },



    // Стоимость
    price: {
        type: String,
        required: false,
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
        required: false,
    },


    // Статус
    status: {
        type: String,
        required: false,
    },


    // Категория
    category: {
        type: String,
        required: false,
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



    // Дата создания
    date: {
        type: Date,
        default: Date.now,
    },



    // Серия СТС
    sts_seria: {
        type: String,
        required: false,
    },

    // Номер СТС
    sts_number: {
        type: String,
        required: false,
    },

    // Дата выдачи СТС
    sts_date: {
        type: String,
        required: false,
    },


    // Серия ОСАГО
    osago_seria: {
        type: String,
        required: false,
    },

    // Номер ОСАГО
    osago_number: {
        type: String,
        required: false,
    },

    // Дата окончания полиса ОСАГО
    osago_date_finish: {
        type: String,
        required: false,
    },


    // Цвет
    color: {
        type: String,
        required: false,
    },


    // Оценочная стоимость
    price_ocenka: {
        type: String,
        required: false,
    },


    // Дата последнего ТО
    to_date: {
        type: String,
        required: false,
    },

    // Пробег на последнем ТО
    to_probeg_prev: {
        type: String,
        required: false,
    },


    // Пробег для следующего ТО
    to_probeg_next: {
        type: String,
        required: false,
    },

    // Интервал ТО
    to_interval: {
        type: String,
        required: false,
    },

    // Наименование моторного масла
    oil_name: {
        type: String,
        required: false,
    },

    // Назание СТОА
    stoa_name: {
        type: String,
        required: false,
    },

    // Телефон СТОА
    stoa_phone: {
        type: String,
        required: false,
    },

});


// Создаем таблицу positions
module.exports = mongoose.model('cars', carSchema);