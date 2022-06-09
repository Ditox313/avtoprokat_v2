const bodyParser = require('body-parser');
const Car = require('../models/Car');
const errorHandler = require('../Utils/errorHendler');





// Контроллер для create
module.exports.create = async function(req, res) {
    try {
        const car = await new Car({
            marka: req.body.marka,
            model: req.body.model,
            number: req.body.number,
            probeg: req.body.probeg,
            price: req.body.price,
            start_arenda: req.body.start_arenda,
            end_arenda: req.body.end_arenda,
            vladelec: req.body.vladelec,
            status: req.body.status,
            category: req.body.category,
            previewSrc: req.file ? req.file.path : '', //Если файл загружен то задаем путь до файла
            user: req.user.id,
        }).save();

        // Возвращаем пользователю позицию которую создали 
        res.status(201).json(car);
    } catch (e) {
        errorHandler(res, e);
    }
};





// Контроллер для fetch
module.exports.fetch = async function(req, res) {
    try {
        // Ищем в таблице позиции по 2 параметрам( по дефолту 1 параметр)
        const cars = await Car.find({
            user: req.user.id //Эти данные берем из объекта user который добавил пасспорт в запрос !!!
        });

        // Возвращаем пользователю позиции 
        res.status(200).json(cars);
    } catch (e) {
        errorHandler(res, e);
    }
};






// Контроллер для update
module.exports.update = async function(req, res) {
    try {

        const updated = req.body;


        // Если объект file есть,то заполняем параметр путем фала
        if (req.file) {
            updated.previewSrc = req.file.path;
        }

        // updated.content = JSON.parse(req.body.content)



        // Находим и обновляем позицию. 
        const carUpdate = await Car.findOneAndUpdate({ _id: updated.carId }, //Ищем по id
            { $set: updated }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
            { new: true } //обновит позицию и верет нам уже обновленную
        );

        // Возвращаем пользователю обновленную позицию 
        res.status(200).json(carUpdate);
    } catch (e) {
        errorHandler(res, e);
    }
};






// Контроллер для getById
module.exports.getById = async function(req, res) {
    try {
        const xscar = await Car.findById(req.params.id); //Ищем категорию по id из переданных параметров
        res.status(200).json(xscar);
    } catch (e) {
        errorHandler(res, e);
    }
};






// Контроллер для remove(Удаляем позицию)
// module.exports.remove = async function(req, res) {
//     try {
//         await Position.remove({
//             _id: req.params.id
//         });

//         // Возвращаем результат
//         res.status(200).json({
//             message: "Позиция была удалена"
//         });
//     } catch (e) {
//         errorHandler(res, e);
//     }
// };