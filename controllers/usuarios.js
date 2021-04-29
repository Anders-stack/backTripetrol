const {response} =require('express');
const { request } = require('express');
const bcryptjs = require('bcryptjs');
const {Usuario} =require('../models/usuario');




const usuariosGet = async (req,res= response) => {
    
    const usuarios = await Usuario.findAll();

    res.json(usuarios);
}

const usuarioGet = async (req=request,res= response) => {
    
    const {id}= req.params;
    const usuario = await Usuario.findByPk(id);
    if(usuario){
        res.json(usuario);
    }
    else{
        res.status(404).json({
            msg: `No existe un usuario con el ${id}`
        })
    }

}

const usuariosPost = async (req=request,res= response) => {

   
    const body = req.body;
    const {pass} = body;
    //verificar correo

    //Encriptar
    const salt = bcryptjs.genSaltSync();
    body.pass = bcryptjs.hashSync(pass,salt)

    try{
        
        const usuario= new Usuario(body);
        await usuario.save();
        res.json({usuario, ok:true});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Algo salio mal, comuniquese con el administrador'
        })
    }

  

}

const usuariosPut = async (req= request,res= response) => {
    
    const {id} = req.params;   
    const {body} = req;

    try{
        const usuario =await Usuario.finbyPk(id);
        if (!Usuario){
            return res.status(400).json({
                msg: `No existe un usario con el id  ${id}`
            })
        }

        await usuario.update( body );
        res.json(usuario);
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Algo salio mal, comuniquese con el administrador'
        })
    }
}
const usuariosDelete = (req,res= response) => {
    
    res.json({
        msg:'DELETE API - cotroller'
    }
    );
}





module.exports ={
    usuariosGet, usuarioGet, usuariosPost,usuariosPut,usuariosDelete
}