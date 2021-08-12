const {response} =require('express');
const { request } = require('express');
const {Flujo} =require('../models/flujo');
const sequelize=require('../db/connections');
const { QueryTypes, Sequelize } = require('sequelize');




const flujoGet = async (req,res= response) => {
    
    const camiones = await Flujo.findAll();

    res.json(camiones);
}
const precioGarrafaGet = async (req,res= response) => {
    
    const precio = await sequelize.query('SELECT VALOR_PRODUCTO FROM dbo.precio_garrafa WHERE FECHA=(SELECT MAX(FECHA) FROM dbo.precio_garrafa);',
    { type: QueryTypes.SELECT });
    if(precio){
        res.json(precio);
    }
    else{
        res.status(404).json({
            msg: `No existe precio actual`
        })
    }
}

const flujoCamionesGet = async (req=request,res= response) => {
    
    const camiones = await sequelize.query('select dbo.camiones.ID, dbo.camiones.MATRICULA, dbo.camiones.ID_CONDUCTOR, dbo.users.Nombre from dbo.camiones inner join dbo.users on dbo.users.ID=dbo.camiones.ID_CONDUCTOR',
    { type: QueryTypes.SELECT });
    if(camiones){
        res.json(camiones);
    }
    else{
        res.status(404).json({
            msg: `No existen camiones`
        })
    }

}
const flujoCamionesEntradaGet = async (req=request,res= response) => {
    
    const camiones = await sequelize.query('SELECT C.Nombre, B.GARRAFAS_VACIAS, B.GARRAFAS_LLENAS, D.MATRICULA, B.ID_CONDUCTOR, B.ID_CAMION FROM (SELECT a.GARRAFAS_VACIAS,a.GARRAFAS_LLENAS,a.ID_CONDUCTOR,a.ID_CAMION,x.ULT_FECHA FROM (SELECT ID_CAMION, MAX(FECHA) AS ULT_FECHA FROM dbo.flujos GROUP BY ID_CAMION) x INNER JOIN dbo.flujos a on a.ID_CAMION=x.ID_CAMION AND a.FECHA=x.ULT_FECHA WHERE SALIDA=1) B INNER JOIN dbo.users C on C.ID=B.ID_CONDUCTOR INNER JOIN dbo.camiones D on D.ID=B.ID_CAMION',
    { type: QueryTypes.SELECT });
    if(camiones){
        res.json(camiones);
    }
    else{
        res.status(404).json({
            msg: `No existen camiones`
        })
    }

}

const flujoPost = async (req=request,res= response) => {

   
    const body = req.body;
    //verificar correo

    try{
        
        const flujo= new Flujo(body);
        await flujo.save();
        res.json({flujo, ok:true});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:error
        })
    }

  

}
const flujosConductorGet = async (req=request,res= response) => {
    
    const {id} = req.params; 
    try {
        const peticionConductor = await sequelize.query(`select dbo.flujos.ID, dbo.users.Nombre, dbo.flujos.Salida, dbo.flujos.FECHA, dbo.flujos.ID_CAMION, dbo.flujos.GARRAFAS_LLENAS, dbo.flujos.GARRAFAS_VACIAS, dbo.flujos.VALOR_PRODUCTO from dbo.flujos inner join dbo.users on dbo.users.ID=dbo.flujos.ID_RAMPLISTA where dbo.flujos.PETICION_CONDUCTOR=1 and dbo.flujos.ID_CONDUCTOR=${id}`,
        { type: QueryTypes.SELECT });
        res.json(peticionConductor);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:error
        })
    }

}
const aprobadoConductorPut = async (req= request,res= response) => {
    
    const {id} = req.params;   
    const {body} = req;

    try{
        const flujo =await Flujo.findByPk(id);
        if (!flujo){
            return res.status(400).json({
                msg: `No existe un usario con el id  ${id}`
            })
        }

        await flujo.update({
            FECHA_CONDUCTOR: Date.now(),
            PETICION_CONDUCTOR: false,
            OK_CONDUCTOR: true,
        }, {
            where: {ID: id}
        }
            
        );
        res.json({flujo, ok:true});
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Algo salio mal, comuniquese con el administrador'
        })
    }
}
const rechazoConductorPut = async (req= request,res= response) => {
    
    const {id} = req.params;   
    const {body} = req;

    try{
        const flujo =await Flujo.findByPk(id);
        if (!flujo){
            return res.status(400).json({
                msg: `No existe un usario con el id  ${id}`
            })
        }

        await flujo.update({
            FECHA_CONDUCTOR: Date.now(),
            PETICION_CONDUCTOR: false,
            OK_CONDUCTOR: false,
        }, {
            where: {ID: id}
        }
            
        );
        res.json({flujo, ok:true});
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Algo salio mal, comuniquese con el administrador'
        })
    }
}

const flujosCajeroGet = async (req=request,res= response) => {
    
    try {
        const peticionConductor = await sequelize.query(`select dbo.flujos.ID, dbo.users.Nombre, dbo.flujos.Salida, dbo.flujos.FECHA, dbo.camiones.MATRICULA, dbo.flujos.GARRAFAS_LLENAS, dbo.flujos.GARRAFAS_VACIAS, dbo.flujos.VALOR_PRODUCTO from dbo.flujos inner join dbo.users on dbo.users.ID=dbo.flujos.ID_RAMPLISTA inner join dbo.camiones on dbo.camiones.ID=dbo.flujos.ID_CAMION where dbo.flujos.PETICION_CAJERO=1`,
        { type: QueryTypes.SELECT });
        res.json(peticionConductor);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:error
        })
    }

}
const aprobadoCajeroPut = async (req= request,res= response) => {
    
    const {id} = req.params;   
    const {body} = req;

    try{
        const flujo =await Flujo.findByPk(id);
        if (!flujo){
            return res.status(400).json({
                msg: `No existe un usario con el id  ${id}`
            })
        }

        await flujo.update({
            FECHA_CAJERO: Date.now(),
            PETICION_CAJERO: false,
            OK_CAJERO: true,
        }, {
            where: {ID: id}
        }
            
        );
        res.json({flujo, ok:true});
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Algo salio mal, comuniquese con el administrador'
        })
    }
}
const rechazoCajeroPut = async (req= request,res= response) => {
    
    const {id} = req.params;   
    const {body} = req;

    try{
        const flujo =await Flujo.findByPk(id);
        if (!flujo){
            return res.status(400).json({
                msg: `No existe un usario con el id  ${id}`
            })
        }

        await flujo.update({
            FECHA_CAJERO: Date.now(),
            PETICION_CAJERO: false,
            OK_CAJERO: false,
        }, {
            where: {ID: id}
        }
            
        );
        res.json({flujo, ok:true});
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Algo salio mal, comuniquese con el administrador'
        })
    }
}
const flujoPut = async (req= request,res= response) => {
    
    const {id} = req.params;   
    const {body} = req;

    try{
        const flujo =await Flujo.findByPk(id);
        if (!Flujo){
            return res.status(400).json({
                msg: `No existe un usario con el id  ${id}`
            })
        }

        await cheque.update( body );
        res.json(cheque);
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Algo salio mal, comuniquese con el administrador'
        })
    }
}
const chequeDelete = (req,res= response) => {
    
    res.json({
        msg:'DELETE API - cotroller'
    }
    );
}





module.exports ={
    flujoPut,
    flujoGet,
    flujoPost,
    flujoCamionesGet,
    precioGarrafaGet,
    flujosConductorGet,
    aprobadoConductorPut,
    rechazoConductorPut,
    flujosCajeroGet,
    rechazoCajeroPut,
    aprobadoCajeroPut,
    flujoCamionesEntradaGet
}