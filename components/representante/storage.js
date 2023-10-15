const modelRepresentante = require('./model')

async function add_representante( dato ) {
    const resultado = await new modelRepresentante( dato )
    return resultado.save()
}

async function get_representante( filtro_ruc ) {
    return new Promise((resolve, reject) => {
        let filtro = {}
        if (filtro_ruc) {
            filtro = { ruc: filtro_ruc }
        }
        modelRepresentante.find( filtro )            
            .populate({
                path:'empresas',
                populate:{
                    path: 'empresa',
                    model:'empresa'
                }
            })
            .exec()
            .then( data => {
                lista = []
                for (let elemento of data) { 
                    objeto = {                   
                        ruc: elemento.ruc,
                        cedula: elemento.cedula,
                        nombre: elemento.nombre,
                        apellido: elemento.apellido,
                        email: elemento.email,
                        domicilio: elemento.domicilio,
                        telefono: elemento.telefono                        
                    }
                    objeto.empresas = []
                    for (let detalle of elemento.empresas) {
                        registro = { 
                            nombre: detalle.empresa.nombre,
                            ruc: detalle.empresa.ruc                            
                        }
                        objeto.empresas.push( registro )
                    }
                    lista.push( objeto )
                }                
                    resolve(lista)
            } )
            .catch (error => {
                reject(error)
            });         
    }) 
}


async function actualizarRepresentante(dato) {
    const objeto = await modelRepresentante.findOne( { cedula: dato.cedula } )

    objeto.nombre = dato.nombre 
    objeto.apellido = dato.apellido
    objeto.email = dato.email 
    objeto.domicilio = dato.domicilio 
    objeto.telefono = dato.telefono 

    const resultado = await objeto.save()
    return resultado
}

async function eliminarRepresentante(dato) {
    const resultado = await modelRepresentante.deleteOne( {ruc: dato.ruc} )
    return resultado
}

module.exports = {
    add:add_representante,
    get:get_representante,
    update:actualizarRepresentante,
    delete:eliminarRepresentante
}