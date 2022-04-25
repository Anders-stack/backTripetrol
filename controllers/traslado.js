const {response} =require('express');
const { request } = require('express');
const bcryptjs = require('bcryptjs');
const {Traslado} =require('../models/traslado');
const sequelize=require('../db/connections');
const { QueryTypes, Sequelize } = require('sequelize');




const chequesGet = async (req,res= response) => {
    
    const cheques = await Cheque.findAll();

    res.json(cheques);
}

const chequesPeticionGet = async (req=request,res= response) => {
    
    const cheques = await sequelize.query('select dbo.cheques.ID, dbo.users.Nombre, dbo.cheques.No_Cheque, dbo.cheques.ID_ADMIN, dbo.cheques.RURAL, dbo.cheques.IMPORTE, dbo.cheques.No_GARRAFAS, dbo.cheques.FECHA_PETICION,dbo.cheques.camiones from dbo.cheques inner join dbo.users on dbo.users.ID=dbo.cheques.ID_ADMIN where dbo.cheques.PETICION=1',
    { type: QueryTypes.SELECT });
    if(cheques){
        res.json(cheques);
    }
    else{
        res.status(404).json({
            msg: `No existe un usuario con el ${id}`
        })
    }

}
const trasladoGet = async (req=request,res= response) => {
    
    const {id}= req.params;
    const traslado = await Traslado.findAll({
        where: {
            ENTRADA: true
        }
      });
    if(traslado){
        res.json({traslado, ok:true});
    }
    else{
        res.status(404).json({
            msg: `No existe un usuario con el ${id}`
        })
    }

}

const trasladoPost = async (req=request,res= response) => {
  
    const body = req.body;
    //verificar correo

    try{
        
        const traslado= new Traslado(body);
        await traslado.save();
        res.json({traslado, ok:true});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:error
        })
    }

  

}
const trasladoPostIn = async (req= request,res= response) => {
    
    const {ID} = req.body;   
    const {body} = req;

    try{
        const traslado =await Traslado.findByPk(ID);
        if (!traslado){
            return res.status(400).json({
                msg: `No existe un usario con el id  ${ID}`
            })
        }

        await traslado.update(body, {
            where: {ID: ID}
        }
            
        );
        res.json({traslado, ok:true});
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Algo salio mal, comuniquese con el administrador'
        })
    }
}
const chequePut = async (req= request,res= response) => {
    
    const {id} = req.params;   
    const {body} = req;

    try{
        const cheque =await Cheque.findByPk(id);
        if (!Cheque){
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
    trasladoPost,
    trasladoPostIn,
    trasladoGet
}