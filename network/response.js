exports.success = function(req, res, data, estado) {
    res.status(estado).send( {error:'', body:data } )
}

exports.error = function(req, res, data, estado) {
    console.log(req)
    console.log(res)
    console.log(data)
    console.log(estado)
    res.status(estado).send( {error:data, body:'' } )
}