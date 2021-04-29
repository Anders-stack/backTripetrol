const {Router} = require('express');
const { check } = require('express-validator');
const router =Router();


const {usuariosGet, usuarioGet, usuariosPost,usuariosPut,usuariosDelete} =require('../controllers/usuarios');
const { emailExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/',usuariosGet);
router.get('/:id',usuarioGet)
router.put('/:id', usuariosPut);
router.post('/', [
    check('email','El correo  no es valido').isEmail(),
    check('Nombre','El nombre es obligatorio').not().isEmpty(),
    check('pass','El correo  no es valido').isLength({min:6}),
    check('email').custom(emailExiste),
    validarCampos
],usuariosPost );
router.delete('/:id',[
    validarJWT
    ], usuariosDelete);

module.exports=router;
