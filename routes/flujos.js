const {Router} = require('express');
const { check } = require('express-validator');
const router =Router();


const {
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
    aprobadoCajeroPut
} =require('../controllers/flujos');
const { emailExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/',flujoGet);
router.get('/camiones',flujoCamionesGet);
router.get('/precio',precioGarrafaGet);
router.put('/aprobadoConductor/:id', aprobadoConductorPut);
router.put('/rechazoConductor/:id', rechazoConductorPut);
router.put('/aprobadoCajero/:id', aprobadoCajeroPut);
router.put('/rechazoCajero/:id', rechazoCajeroPut);
router.get('/peticionC/:id', flujosConductorGet);
router.get('/peticionCa', flujosCajeroGet);
router.post('/',flujoPost );

module.exports=router;