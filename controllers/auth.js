const {response} =require('express');
const { request } = require('express');
const bcryptjs= require('bcryptjs');

const { body } = require('express-validator');
const {Usuario} =require('../models/usuario');
const {generarJWT}=require('../helpers/generar-jws');
const { googleVerify } = require('../helpers/google-verify');

const login= async(req=request, res=response) => {




    const {email: correo, pass} =req.body;
    try{


        //verificar si el email existe
        const usuario =await Usuario.findOne({
            where: {
                email: correo
            }
        });

        if(!usuario){
            return res.status(400).json({
                msg:'Usuario/Password no son correctos'
            })
        }
        //Verificar contraseña
        const validPassword = bcryptjs.compareSync(pass,usuario.pass)
        if (!validPassword){
            return res.status(400).json({
                msg:'Usuario/Password no son correctos'
            })
            
        }
        //Generar el JWT
       const token =await generarJWT( usuario.id )

        res.json({
            usuario,token
        })
    } catch (error) {
        return res.status(500).json({
            msg:'Hable con el administrador'
        })
    }




}

const googleSignin = async(req, res = response) => {

    const {id_token} =req.body;


    try{
        
    const googleUser = await googleVerify(id_token); 

    console.log(googleUser)
        res.json({
            msg: 'Todo ok google Sign in',
            id_token
    
        })

    }catch(error){
        res.status(400).json({
            msg: 'Token de Google no es valida'
        })
    }
}

module.exports= {login, googleSignin}