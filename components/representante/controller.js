const storage = require('./storage')

function get_representante( filtro_representante ) {
    return new Promise((resolve, reject) => {
        resolve( storage.get( filtro_representante ) )
    })
}

function add_representante( representante ) {
    return new Promise((resolve, reject) => {
        if (!representante.ruc) {
            return reject('No hay datos suficientes.')
        }
        storage.add( representante )
        resolve( representante )        
    })
}

function update_representante( representante ) {
    return new Promise((resolve, reject) => {
        let resultado = storage.update( representante )
        if (resultado) {
            return resolve( representante )
        } else {
            return reject('No existe el factura.')
        }
    })
}

module.exports = {
    get_representante,
    add_representante,
    update_representante
}