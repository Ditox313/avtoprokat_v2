// Контроллер для getAll(получить все категории который создал пользователь)
module.exports.getAll = async function(req, res) {
    res.status(200).json({
        message: "Все гуд"
    });


};