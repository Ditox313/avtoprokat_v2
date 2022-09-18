const bodyParser = require('body-parser');
const Pay = require('../models/Pays');
const Booking = require('../models/Booking');
const errorHandler = require('../Utils/errorHendler');





module.exports.create = async function(req, res) {
    try {
        const lastOrder = await Pay.findOne({
            userId: req.user._id
        })
        .sort({ date: -1 });


        const maxOrder = lastOrder ? lastOrder.order : 0;


        const pay = await new Pay({
            userId: req.user._id,
            vidPay: req.body.vid,
            typePay: req.body.typePay,
            bookingId: req.body.bookingId,
            pricePay: req.body.pricePay,
            order: maxOrder + 1,
        }).save();


        const actualBooking = await Booking.find({ _id: req.body.bookingId })
        const paidCount = actualBooking[0].paidCount + (+req.body.pricePay);

        const updated = { paidCount: paidCount };

        // Находим и обновляем позицию.
        const bookingUpdate = await Booking.findOneAndUpdate({ _id: req.body.bookingId }, //Ищем по id
            { $set: updated }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
            { new: true } //обновит позицию и верет нам уже обновленную
        );

        res.status(201).json({ paidCount });
    } catch (e) {
        errorHandler(res, e);
    }
};





module.exports.getPaysByBookingId = async function(req, res) {
    try {
        // Ищем в таблице позиции по 2 параметрам( по дефолту 1 параметр)
        const bookings = await Pay.find({ bookingId: req.params.id }).sort({ date: -1 });

        // Возвращаем пользователю позиции 
        res.status(200).json( bookings );
    } catch (e) {
        errorHandler(res, e);
    }
};










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


//         // Возвращаем результат
//         res.status(200).json({
//             message: "Бронь удалена"
//         });
//     } catch (e) {
//         errorHandler(res, e);
//     }
// };


