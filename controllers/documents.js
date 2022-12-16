const bodyParser = require('body-parser');
const Document = require('../models/Document');
const errorHandler = require('../Utils/errorHendler');





// Контроллер для create
module.exports.create = async function(req, res) {
    try {

        // Ищем номер последнего заказа глобального
        const lastOrder = await Booking.findOne({
            user: req.user.id
        })
        .sort({ date: -1 });


        // Если мы нашли предполагаемы последнйи заказ, то устанвливает поле order
        const maxOrder = lastOrder ? lastOrder.order : 0;


        const booking = await new Booking({
            car: req.body.car ,
            client: req.body.client,
            place_start: req.body.place_start,
            place_end: req.body.place_end,
            tariff: req.body.tariff,
            comment: req.body.comment,
            booking_start: req.body.booking_start,
            booking_end: req.body.booking_end,
            booking_days: req.body.booking_days,
            summa: req.body.summa,
            summaFull: req.body.summaFull,
            status: req.body.status,
            user: req.user._id,
            order: maxOrder + 1,
            dop_hours: req.body.dop_hours,
            dop_info_open: req.body.dop_info_open,
            booking_zalog: req.body.booking_zalog
        }).save();

        // Возвращаем пользователю позицию которую создали 
        res.status(201).json(booking);
    } catch (e) {
        errorHandler(res, e);
    }
};





// Контроллер для fetch
// module.exports.fetch = async function(req, res) {
//     try {
//         // Ищем в таблице позиции по 2 параметрам( по дефолту 1 параметр)
//         const bookings = await Booking.find({
//                 user: req.user.id //Эти данные берем из объекта user который добавил пасспорт в запрос !!!
//             }).sort({ date: -1 })
//             .skip(+req.query.offset) //Отступ для бесконечного скрола на фронтенде. Приводим к числу
//             .limit(+req.query.limit); //Сколько выводить на фронтенде. Приводим к числу

//         // Возвращаем пользователю позиции 
//         res.status(200).json(bookings);
//     } catch (e) {
//         errorHandler(res, e);
//     }
// };










// Контроллер для update
// module.exports.update = async function(req, res) {
//     try {

//         const updated = req.body;


//         // Находим и обновляем позицию. 
//         const bookingUpdate = await Booking.findOneAndUpdate({ _id: updated._id }, //Ищем по id
//             { $set: updated }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
//             { new: true } //обновит позицию и верет нам уже обновленную
//         );

//         // Возвращаем пользователю обновленную позицию 
//         res.status(200).json(bookingUpdate);
//     } catch (e) {
//         errorHandler(res, e);
//     }
// };




// Контроллер для getById
// module.exports.getById = async function(req, res) {
//     try {
//         const xsbooking = await Booking.findById(req.params.id); //Ищем категорию по id из переданных параметров
//         res.status(200).json(xsbooking);
//     } catch (e) {
//         errorHandler(res, e);
//     }
// };







// Контроллер для remove
// module.exports.remove = async function(req, res) {
//     try {
//         await Booking.remove({
//             _id: req.params.id
//         });

//         await Pays.remove({
//             bookingId: req.params.id
//         });


//         // Возвращаем результат
//         res.status(200).json({
//             message: "Бронь удалена"
//         });
//     } catch (e) {
//         errorHandler(res, e);
//     }
// };



