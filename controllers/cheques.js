const {response} =require('express');
const { request } = require('express');
const bcryptjs = require('bcryptjs');
const {Cheque} =require('../models/cheque');
const sequelize=require('../db/connections');
const { QueryTypes, Sequelize } = require('sequelize');




const chequesGet = async (req,res= response) => {
    
    const cheques = await Cheque.findAll();

    res.json(cheques);
}

const chequesPeticionGet = async (req=request,res= response) => {
    
    const cheques = await sequelize.query('select dbo.cheques.ID, dbo.users.Nombre, dbo.cheques.No_Cheque, dbo.cheques.ID_ADMIN, dbo.cheques.RURAL, dbo.cheques.IMPORTE, dbo.cheques.No_GARRAFAS, dbo.cheques.FECHA_PETICION from dbo.cheques inner join dbo.users on dbo.users.ID=dbo.cheques.ID_ADMIN where dbo.cheques.PETICION=1',
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
const chequeGet = async (req=request,res= response) => {
    
    const {id}= req.params;
    const cheque = await Cheque.findByPk(id);
    if(cheque){
        res.json(cheque);
    }
    else{
        res.status(404).json({
            msg: `No existe un usuario con el ${id}`
        })
    }

}

const chequePost = async (req=request,res= response) => {

   
    const body = req.body;
    //verificar correo

    try{
        
        const cheque= new Cheque(body);
        await cheque.save();
        res.json({cheque, ok:true});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:error
        })
    }

  

}
const chequePutAprob = async (req= request,res= response) => {
    
    const {id} = req.params;   
    const {body} = req;

    try{
        const cheque =await Cheque.findByPk(id);
        if (!Cheque){
            return res.status(400).json({
                msg: `No existe un usario con el id  ${id}`
            })
        }

        await cheque.update({
            FECHA_VALIDACION: Date.now(),
            ID_VALIDADOR: body.idAdmin,
            PETICION: false,
        }, {
            where: {ID: id}
        }
            
        );
        res.json(cheque);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Algo salio mal, comuniquese con el administrador'
        })
    }
}
const chequePutAnul = async (req= request,res= response) => {
    
    const {id} = req.params;   
    const {body} = req;

    try{
        const cheque =await Cheque.findByPk(id);
        if (!Cheque){
            return res.status(400).json({
                msg: `No existe un usario con el id  ${id}`
            })
        }

        await cheque.update({
            FECHA_VALIDACION: Date.now(),
            ID_VALIDADOR: body.idAdmin,
            ANULADO: true,
            PETICION: false,
        }, {
            where: {ID: id}
        }
            
        );
        res.json(cheque);
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
   chequePost,
   chequeDelete,
   chequePut,chequeGet,chequesPeticionGet,
   chequesGet,
   chequePutAprob,
   chequePutAnul
}