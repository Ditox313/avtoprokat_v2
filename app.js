const express = require('express');
const authRoutes = require('./routes/auth.js');
const carsRoutes = require('./routes/cars.js');
const clientsRoutes = require('./routes/clients.js');
const partnersRoutes = require('./routes/partners.js');
const bookingsRoutes = require('./routes/bookings.js');
const paysRoutes = require('./routes/pays.js');
const documentsRoutes = require('./routes/documents.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const keys = require('./config/keys.js');
const passport = require('passport');
const app = express();

// Если не работает path при деплое
const path = require('path');


// Регистрируем модуль bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Подключаемся к MongoDB
mongoose.connect(keys.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(function() {
        console.log('Мы подключились к БД приложения!!!');
    })
    .catch(function(error) {
        console.log(error);
    });




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
app.use('/api/cars', carsRoutes);


// Регистрируем роут clients
app.use('/api/clients', clientsRoutes);


// Регистрируем роут partners
app.use('/api/partners', partnersRoutes);


// Регистрируем роут bookings
app.use('/api/bookings', bookingsRoutes);


// Регистрируем роут pays
app.use('/api/pays', paysRoutes);


// Регистрируем роут documents
app.use('/api/documents', documentsRoutes);







// Добавляем возможность отдавать с сервера картинки по запросу. (Когда будет запрос к uploads, делай эту папку статической)
app.use('/uploads/cars', express.static('uploads/cars'));
app.use('/uploads/docs', express.static('uploads/docs'));

















// Экспортируем наружу
module.exports = app;