const Data = require('../models/data');
const DataUsers = require('../models/userSchema');
const DataSchedules = require('../models/scheduleSchema');
const DataActivity = require('../models/activitySchema');
const TokenSchema = require('../models/tokensSchema');
const { generateToken } = require('./jwtUtils');


//list all items
exports.list = async (req, res) => {
    try {
        const data = await Data.find({});
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(200).send(error);
        next();
    }
};

exports.show = async (req, res, next) => {
    try {
        const data = await Data.findOne({ id: req.params.id });
        if (!data) {
            res.status(404).json({ message: "Message not found" });
        }
        res.json(data);

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error" });
        next();
    }
};

exports.last = async (req, res) => {
    try {
        const data = await Data.find({}).sort({ createdAt: -1 }).limit(1);
        return res.status(200).json({ data });
    } catch {
        return res.status(500).send({ message: "Error." });
    }
};

exports.top25 = async (req, res) => {
    try {
        const data = await Data.find({}).sort({ createdAt: -1 }).limit(25);
        return res.status(200).json({ data });
    } catch {
        return res.status(500).send({ message: "Error." });
    }
};

exports.Date_show = async (req, res) => {
    const { initial_date, final_date } = req.body;
    if (!initial_date || !final_date) {
        return res.status(500).send({ message: "Error, se debe introducir fecha de inicio y fin." });
    } else {
        var isDateOK1 = isDateValid(initial_date);
        var isDateOK2 = isDateValid(final_date);

        if (isDateOK1 && isDateOK2) {
            if (Date.parse(initial_date) >= Date.parse(final_date)) {
                return res.status(500).send({ message: "Error, la fecha de inicio tiene que ser mayor a la fecha final." });
            } else {
                var date1 = new Date(initial_date);
                var date2 = new Date(final_date);

                const data = await Data.find({ createdAt: { $gt: date1, $lt: date2 } });
                return res.status(200).send({ initial: date1, final: date2, data: data });

            }
        } else {
            return res.status(500).send({ message: "Error, las fechas tienen que tener el formato válido de fecha, alguna fecha puede estar mala." });
        }
    }
};

function isDateValid(dateStr) {
    var isDateOK = !isNaN(new Date(dateStr)); // true if dateStr is a valid date
    var date = new Date(dateStr);
    if (isDateOK) {
        let day = date.getDate();
        day = day < 10 ? "0" + day : day;
        let month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        const year = date.getFullYear();
        return true;
    } else {
        return false;
    }
};

exports.add = async (req, res, next) => {
    const { temperatura, humedad_relativa, CO2, VOC, intensidad_luminosa } = req.body;

    const data = new Data({
        temperatura: temperatura || 0,
        humedad_relativa: humedad_relativa || 0,
        CO2: CO2 || 0,
        VOC: VOC || 0,
        intensidad_luminosa: intensidad_luminosa || 0,
    })

    try {
        await data.save();
        res.json({ message: "Added new message", data: data });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};

exports.update = async (req, res, next) => {
    try {
        const data = await Data.findOneAndUpdate(
            { id: req.params.id }, req.body
        );
        res.json({ message: "Updated message", data: data });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error" });
        next();
    }

};

exports.delete = async (req, res, next) => {
    try {
        const data = await Data.findOneAndDelete({ id: req.params.id });
        res.json({ message: "Deleted message", data: data });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "El mensaje no existe" });
        next();
    }
};

//Controladores para usuarios

//buscar todos los usuarios
exports.listusers = async (req, res, next) => {
    try {
        const data = await DataUsers.find({});
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(200).send(error);
        next();
    }
};

//añadir usuario
exports.adduser = async (req, res, next) => {
    //Status no es posible que venga porque eso se le asigna acá en el backend
    const { name, email, password, status, activity } = req.body;

    const data = new DataUsers({
        name: name || 0,
        email: email || 0,
        password: password || 0,
        status: status || false,
        activity: activity || false
    })

    try {
        await data.save();
        res.json({ message: "Added new message", data: data });
    } catch (error) {
        console.log(error);
        res.send(error);
        next(error);
    }
}

//actualizar usuario
exports.updateuser = async (req, res, next) => {
    try {
        const data = await DataUsers.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            {
                new: true,
                runValidators: true,
                context: 'query'
            }
        );
        if (!data) {
            return res.status(400).json({ message: "user not found" })
        }
        res.json({ message: "user updated", data: data });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error" });
        next(error);
    }

};

//eliminar usuario
exports.deleteuser = async (req, res, next) => {
    try {
        const data = await DataUsers.findOneAndDelete(
            { _id: req.params.id },
            req.body,
            {
                new: true,
                runValidators: true,
                context: 'query'
            }
        );
        if (!data) {
            return res.status(400).json({ message: "user not found" })
        }
        res.json({ message: "user deleted", data: data });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error" });
        next(error);
    }

};

//Eliminar usuarios

exports.deleteAllUsers = async (req, res, next) => {
    try {
        const data = await DataUsers.deleteMany({});
        if (!data) {
            return res.status(500).json({ message: "users not found" })
        }
        res.json({ message: "users deleted", data: data });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error" });
        next(error);
    }
}


//This is for the token blacklist checking when the user logs out, so then we'll invalidate the past current token.
let blackListedTokens = [];

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await DataUsers.findOne({ email:
        email, password: password });
    if (user) {
        const tokenPayload = { 
            userId: user.name, // Example of including user ID
            email: user.email // Include necessary information
        };
        const token = generateToken(tokenPayload);
        const tokenStored = new TokenSchema({
            token: token,
            userId: user._id,
        }); 
        user.activity = true; //El estado es true porque acaba de ingresar a la aplicación.
        await user.save();
        await tokenStored.save(); //Guardamos el token en la base de datos
        res.json({ success: true, message: "User logged in", token: token });
    } else {
        res.status(400).json({ message: "User not found", success: false});
    }
};

//controladores para horarios

//buscar todos los horarios
exports.listshedules = async (req, res) => {
    try {
        const data = await DataSchedules.find({});
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(200).send(error);
        next();
    }
};

//añadir horario
exports.addschedule = async (req, res) => {
    const { name, description, hour, idUser } = req.body;

    const data = new DataSchedules({
        name: name || 0,
        description: description || 0,
        hour: hour || 0,
        idUser: idUser || 0
    })

    try {
        await data.save();
        res.json({ message: "Added new message", data: data });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

//actualizar horario
exports.updateschedule = async (req, res, next) => {
    try {
        const data = await DataSchedules.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            {
                new: true,
                runValidators: true,
                context: 'query'
            }
        );
        if (!data) {
            return res.status(400).json({ message: "schedule not found" })
        }
        res.json({ message: "schedule updated", data: data });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error" });
        next(error);
    }

};

//eliminar horario
exports.deleteschedule = async (req, res, next) => {
    try {
        const data = await DataSchedules.findOneAndDelete(
            { _id: req.params.id },
            req.body,
            {
                new: true,
                runValidators: true,
                context: 'query'
            }
        );
        if (!data) {
            return res.status(400).json({ message: "shedule not found" })
        }
        res.json({ message: "schedule deleted", data: data });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error" });
        next(error);
    }

};

//CONTROLADORES PARA ACTIVIDADES

//agregar actividad
exports.addactivity = async (req, res, next) => {
    const { name, description, date, status, idUser } = req.body;

    const data = new DataActivity({
        name: name || 0,
        description: description || 0,
        date: new Date(date),
        status: status || false,
        idUser: idUser || 0
    })

    try {
        await data.save();
        res.json({ message: "Added new message", data: data });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

//eliminar actividad
exports.deleteactivity = async (req, res, next) => {
    try {
        const data = await DataActivity.findOneAndDelete(
            { _id: req.params.id },
            req.body,
            {
                new: true,
                runValidators: true,
                context: 'query'
            }
        );
        if (!data) {
            return res.status(400).json({ message: "activity not found" })
        }
        res.json({ message: "activity deleted", data: data });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error" });
        next(error);
    }

};

//actualizar actividad
exports.updateactivity = async (req, res, next) => {
    try {
        const data = await DataActivity.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            {
                new: true,
                runValidators: true,
                context: 'query'
            }
        );
        if (!data) {
            return res.status(400).json({ message: "activity not found" })
        }
        res.json({ message: "activity updated", data: data });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error" });
        next(error);
    }

};

//buscar todas las actividades
exports.listsactivity = async (req, res) => {
    try {
        const data = await DataActivity.find({});
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(200).send(error);
        next();
    }
};