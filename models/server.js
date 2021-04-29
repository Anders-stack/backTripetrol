const express = require('express');
const cors = require('cors');

const sequelize=require('../db/connections');

class Server{

    constructor(){
        this.app =express();
        this.port=process.env.PORT

        this.usuariosPath='/api/usuarios'
        this.authPath='/api/auth'


        //database
        this.dbConnection();
        //middlewares
        this.middlewares();
        //Rutas de aplicacion (Endpoint)
        this.routes();
    }

    async dbConnection(){
         try{
            await sequelize.authenticate();
         }catch{
            throw new Error(error)
         }
    }


    middlewares(){


        //CORS
        this.app.use(cors())
        // Directorio publico
        this.app.use(express.static('public'))
        //Lectura del Body tipo JSON
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.authPath,require('../routes/auth'))
        this.app.use(this.usuariosPath,require('../routes/usuarios'))
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto ',this.port )
        })
    }

}
module.exports=Server;