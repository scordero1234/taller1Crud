
const modelRepresentante = require('./model')

function get_representante( filtro_representantelegal ) {
    return new Promise((resolve, reject) => {
        let filtro = {}
        if (filtro_representantelegal) {
            filtro = { ruc: filtro_representantelegal }
        }
        modelRepresentante.find( filtro ) 
            .populate({
                path:'empresa',
            })

            .exec()
            .then(data => { 
                lista = []
                for (let elemento of data) {
                    objeto = { 
                        ruc:elemento.ruc,
                        nombre:elemento.nombre,
                        apellido:elemento.apellido,
                        email:elemento.email,
                        domicilio:elemento.domicilio,
                        telefono:elemento.telefono, 
                    }
                    objeto.detalles = []
                    for (let detalle of elemento.empresa) {
                        registro = { 
                            ruc: detalle.ruc,
                            nombre:detalle.nombre,
                            direccion:detalle.domicilio,
                            telefono:detalle.telefono, 
                        }
                        objeto.detalles.push( registro )
                    }
                    lista.push( objeto )
                }
                resolve(lista)
                }) 
                .catch(error => {
                    reject(error)
                  });   
    }) 
}

function add_representante( representante ) {
    console.log('llega')
    representante.telefono ='0998723875'
console.log(" ********")
    const objeto = new modelRepresentante( representante )
    objeto.save()
}
async function delete_representante( representante ) {
    return await model.deleteOne({ruc: representante.ruc})
}
async function update_representante( representante ) {
    const objeto = await model.findOne( {ruc: representante.ruc} )
    if ( objeto ) {
        objeto.estado = False
        return resultado = await objeto.save()
    } else {
        return null
    }
}

module.exports = {
    add: add_representante,
    get: get_representante,
    update: update_representante
}