const storage = require('./storage')
function add_representante( representante ) {
    return new Promise((resolve, reject) => {
        resolve( storage.add( representante ) )
    })
}
function get_representante( representante ) {
    return new Promise((resolve, reject) => {
        resolve( storage.get( representante ) )
    })
}
function update_representante( representante ) {
    return new Promise((resolve, reject) => {        
        resolve( storage.update( representante ) )
    })
}
function delete_representante( representante ) {
    return new Promise((resolve, reject) => {
        resolve( storage.delete( representante ) )
    })    
}

module.exports = {
    add_representante,
    get_representante,
    update_representante,
    delete_representante
}