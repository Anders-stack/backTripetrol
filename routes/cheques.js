const {Router} = require('express');
const { check } = require('express-validator');
const router =Router();


const {chequePost,chequeDelete,chequePut,chequeGet,chequesPeticionGet,chequesGet,chequePutAprob,chequePutAnul} =require('../controllers/cheques');
const { emailExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/',chequesGet);
router.get('/peticiones',chequesPeticionGet);
router.put('/:id', chequePut);
router.put('/aprobado/:id', chequePutAprob);
router.put('/anulado/:id', chequePutAnul);
router.post('/',chequePost );
router.delete('/:id', chequeDelete);

module.exports=router;