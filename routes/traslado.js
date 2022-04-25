const {Router} = require('express');
const { check } = require('express-validator');
const router =Router();


const {trasladoPost,trasladoPostIn,trasladoGet} =require('../controllers/traslado');
const { emailExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


router.post('/',trasladoPost );
router.post('/in',trasladoPostIn );
router.get('/peticiones',trasladoGet );

module.exports=router;