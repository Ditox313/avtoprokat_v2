const bodyParser = require('body-parser');
const Partner = require('../models/Partner');
const errorHandler = require('../Utils/errorHendler');





// Контроллер для create
module.exports.create = async function(req, res) {
    try {
        const partner = await new Partner({
            name: req.body.name,
            surname: req.body.surname,
            lastname: req.body.lastname,
            passport_seria: req.body.passport_seria,
            passport_number: req.body.passport_number,
            passport_date: req.body.passport_date,
            passport_who_take: req.body.passport_who_take,
            code_podrazdeleniya: req.body.code_podrazdeleniya,
            passport_register: req.body.passport_register,
            passport_address_fact: req.body.passport_address_fact,
            prava_seria: req.body.prava_seria,
            prava_number: req.body.prava_number,
            prava_date: req.body.prava_date,
            phone_main: req.body.phone_main,
            phone_1_dop_name: req.body.phone_1_dop_name,
            phone_1_dop_number: req.body.phone_1_dop_number,
            phone_2_dop_name: req.body.phone_2_dop_name,
            phone_2_dop_number: req.body.phone_2_dop_number,
            phone_3_dop_name: req.body.phone_3_dop_name,
            phone_3_dop_number: req.body.phone_3_dop_number,
            phone_4_dop_name: req.body.phone_4_dop_name,
            phone_4_dop_number: req.body.phone_4_dop_number,
            user: req.user._id,
            passport_1_img: req.files.passport_1_img[0].path, //Если файл загружен то задаем путь до файла
            passport_2_img: req.files.passport_2_img[0].path, 
            prava_1_img: req.files.prava_1_img[0].path, 
            prava_2_img: req.files.prava_2_img[0].path, 
            
        }).save();

        // Возвращаем пользователю позицию которую создали 
        res.status(201).json(partner);
    } catch (e) {
        errorHandler(res, e);
    }
};





// Контроллер для fetch
// module.exports.fetch = async function(req, res) {
//     try {
//         // Ищем в таблице позиции по 2 параметрам( по дефолту 1 параметр)
//         const cars = await Car.find({
//                 user: req.user.id //Эти данные берем из объекта user который добавил пасспорт в запрос !!!
//             }).sort({ date: -1 })
//             .skip(+req.query.offset) //Отступ для бесконечного скрола на фронтенде. Приводим к числу
//             .limit(+req.query.limit); //Сколько выводить на фронтенде. Приводим к числу

//         // Возвращаем пользователю позиции 
//         res.status(200).json(cars);
//     } catch (e) {
//         errorHandler(res, e);
//     }
// };










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