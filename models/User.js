const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Создаем схему для таблицы users

const userSchema = new Schema({
    // Создаем поле с email юзера
    email: {
        type: String,
        required: true,
        unique: true
    },

    // Создаем поле паролем юзера
    password: {
        type: String,
        required: true,
    },

});


// Создаем таблицу users
module.exports = mongoose.model('users', userSchema);