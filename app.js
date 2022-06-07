const express = require('express');
const authRoutes = require('./routes/auth.js');
const categoriesRoutes = require('./routes/category.js')
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const keys = require('./config/keys.js');
const passport = require('passport');



const app = express();


// Подключаемся к MongoDB
mongoose.connect(keys.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(function() {
        console.log('Мы подключились к БД приложения!!!');
    })
    .catch(function(error) {
        console.log(error);
    });




// Регистрируем модуль bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Регистрируем Morgan 
app.use(morgan('dev'));

// Регистрируем Cors
app.use(cors());

// Инициализируем passport и подключаем файл обработчик для логики защиты и проверки роутов
app.use(passport.initialize());
require('./middleware/passport')(passport);




// Регистрируем роут auth
app.use('/api/auth', authRoutes);


// Регистрируем роут auth
app.use('/api/categories', categoriesRoutes);









// Добавляем возможность отдавать с сервера картинки по запросу. (Когда будет запрос к uploads, делай эту папку статической)
app.use('/uploads/cars', express.static('uploads/cars'));

















// Экспортируем наружу
module.exports = app;