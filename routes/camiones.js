const {Router} = require('express');
const { check } = require('express-validator');
const router =Router();


const {camionGet} =require('../controllers/camiones');
const { emailExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


router.post('/',camionGet );

module.exports=router;