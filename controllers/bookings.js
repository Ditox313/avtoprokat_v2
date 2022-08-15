const bodyParser = require('body-parser');
const Booking = require('../models/Booking');
const errorHandler = require('../Utils/errorHendler');





// Контроллер для create
module.exports.create = async function(req, res) {
    try {
        const booking = await new Booking({
            car: req.body.car ,
            client: req.body.client,
            place_start: req.body.place_start,
            place_end: req.body.place_end,
            tariff: req.body.tariff,
            comment: req.body.comment,
            booking_start: req.body.booking_start,
            booking_end: req.body.booking_end,
            status: req.body.status,
            user: req.user._id,
            // category: req.body.category,
            // previewSrc: req.file ? req.file.path : '', //Если файл загружен то задаем путь до файла
            

        }).save();

        // Возвращаем пользователю позицию которую создали 
        res.status(201).json(booking);
    } catch (e) {
        errorHandler(res, e);
    }
};





// Контроллер для fetch
module.exports.fetch = async function(req, res) {
    try {
        // Ищем в таблице позиции по 2 параметрам( по дефолту 1 параметр)
        const bookings = await Booking.find({
                user: req.user.id //Эти данные берем из объекта user который добавил пасспорт в запрос !!!
            }).sort({ date: -1 })
            .skip(+req.query.offset) //Отступ для бесконечного скрола на фронтенде. Приводим к числу
            .limit(+req.query.limit); //Сколько выводить на фронтенде. Приводим к числу

        // Возвращаем пользователю позиции 
        res.status(200).json(bookings);
    } catch (e) {
        errorHandler(res, e);
    }
};










// Контроллер для update
// module.exports.update = async function(req, res) {
//     try {

//         const updated = req.body;


//         // Если объект file есть,то заполняем параметр путем фала
//         if (req.file) {
//             updated.previewSrc = req.file.path;
//         }





//         // Находим и обновляем позицию. 
//         const carUpdate = await Car.findOneAndUpdate({ _id: updated.carId }, //Ищем по id
//             { $set: updated }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
//             { new: true } //обновит позицию и верет нам уже обновленную
//         );

//         // Возвращаем пользователю обновленную позицию 
//         res.status(200).json(req.body);
//     } catch (e) {
//         errorHandler(res, e);
//     }
// };






// Контроллер для getById
// module.exports.getById = async function(req, res) {
//     try {
//         const xscar = await Car.findById(req.params.id); //Ищем категорию по id из переданных параметров
//         res.status(200).json(xscar);
//     } catch (e) {
//         errorHandler(res, e);
//     }
// };






// Контроллер для remove
// module.exports.remove = async function(req, res) {
//     try {
//         await Car.remove({
//             _id: req.params.id
//         });


//         // Возвращаем результат
//         res.status(200).json({
//             message: "Автомобиль удален"
//         });
//     } catch (e) {
//         errorHandler(res, e);
//     }
// };