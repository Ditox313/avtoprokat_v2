const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Создаем схему для таблицы partners

const partnerSchema = new Schema({

    // Имя
    name: {
        type: String,
        default: '',
        required: true,
    },

    // Фамилия
    surname: {
        type: String,
        default: '',
        required: true,
    },

    // Отчество
    lastname: {
        type: String,
        default: '',
        required: true,
    },

    // Серия паспорта
    passport_seria: {
        type: String,
        default: '',
        required: true,
    },

    // Номер паспорта
    passport_number: {
        type: String,
        default: '',
        required: true,
    },

    // Дата выдачи паспорта
    passport_date: {
        type: String,
        default: '',
        required: true,
    },

    // Кем выдан пасспорт
    passport_who_take: {
        type: String,
        default: '',
        required: true,
    },

    // Код подразделения
    code_podrazdeleniya: {
        type: String,
        default: '',
        required: true,
    },

    // Регистрация
    passport_register: {
        type: String,
        default: '',
        required: true,
    },

    // Адрес фактического проживания
    passport_address_fact: {
        type: String,
        default: '',
        required: true,
    },

    // Серия водительского удостоверения
    prava_seria: {
        type: String,
        default: '',
        required: true,
    },

    // Номер водительского удостоверения
    prava_number: {
        type: String,
        default: '',
        required: true,
    },

    // Дата выдачи водительского удостоверения
    prava_date: {
        type: String,
        default: '',
        required: true,
    },

    // Дата выдачи водительского удостоверения
    prava_date: {
        type: String,
        default: '',
        required: true,
    },

    // Имя номера телефона №1
    phone_1_name: {
        type: String,
        default: '',
        required: true,
    },

    // Номер номера телефона №1
    phone_1_number: {
        type: String,
        default: '',
        required: true,
    },


    // Имя номера телефона №2
    phone_2_name: {
        type: String,
        default: '',
        required: true,
    },

    // Номер номера телефона №2
    phone_2_number: {
        type: String,
        default: '',
        required: true,
    },

    // Имя номера телефона №3
    phone_3_name: {
        type: String,
        default: '',
        required: true,
    },

     // Номер номера телефона №3
    phone_3_number: {
        type: String,
        default: '',
        required: true,
    },


});


// Создаем таблицу partners
module.exports = mongoose.model('partners', partnerSchema);