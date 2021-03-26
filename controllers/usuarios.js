const {response} =require('express');
const { request } = require('express');
const  Connection  = require('tedious').Connection;
const Request = require('tedious').Request;




const usuariosGet = (req,res= response) => {
    
    res.json({
        msg:'GET API - cotroller'
    }
    );
}

const usuariosPost = (req=request,res= response) => {

    const connection = new Connection({
        server: 'acaditecserver.database.windows.net',
        authentication: {
            type: 'default',
            options: {
                userName: 'acaditec',
                password: '1668822Lp',
            }
        },
        options: {
            database: 'aitecdb1',
            port: 1433,
        }
    });    

    const body = req.body;
    const {titulo, valor, disponible}=JSON.parse(body)
    const datos=JSON.parse (body)

    connection.connect(function(err) {
        if (err) {
          console.log('Connection Failed!');
          throw err;
        }
        const sql = `INSERT INTO [dbo].[Productos] (titulo,precio,disponible) VALUES ('${titulo}',${valor},${disponible?1:0})`;
        const request = new Request(sql, (err, rowCount) => {
          if (err) {
            throw err;
          }
      
          console.log(`Datos insertados!.`);
        });
      
        connection.execSql(request);
      });


    console.log(body);
    res.json({
        msg:'POST API - cotroller',
        datos
    }
    );
}

const usuariosPut = (req,res= response) => {
    
    res.json({
        msg:'PUT API - cotroller'
    }
    );
}
const usuariosDelete = (req,res= response) => {
    
    res.json({
        msg:'DELETE API - cotroller'
    }
    );
}

function insertDatosProduto(titulo,precio,disponible) {

  }



module.exports ={
    usuariosGet, usuariosPost,usuariosPut,usuariosDelete
}