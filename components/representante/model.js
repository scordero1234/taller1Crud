const mongoose = require('mongoose')
const Schema = mongoose.Schema



const req_string = {
    type: String,
    required: true
}



const empresa_schema = new Schema({
    ruc: String,
    nombre: String,
    domicilio: String,
    telefono: String
})

const representante_schema = new Schema({

    ruc: String,
    cedula:String,
    nombre: String,
    apellido:String,
    email:String,
    domicilio: String,
    telefono: String,
    empresa: [empresa_schema]
})

const model = mongoose.model('Representante', representante_schema)
module.exports = model

