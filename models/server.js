const express = require('express');

class Server{

    constructor(){
        this.app =express();
        this.port=process.env.PORT

        //middlewares
        this.middlewares();
        //Rutas de aplicacion (Endpoint)
        this.routes();
    }

    middlewares(){

        this.app.use(express.static('public'))
        //Lectura del Body tipo JSON
        this.app.use(express.text());
    }

    routes(){
        this.app.use('/api/usuarios',require('../routes/usuarios'))
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto ',this.port )
        })
    }

}
module.exports=Server;