const {Router} = require('express');
const router =Router();
const {usuariosGet, usuariosPost,usuariosPut,usuariosDelete} =require('../controllers/usuarios')


router.get('/',usuariosGet);

router.put('/', usuariosPut);
router.post('/',usuariosPost );
router.delete('/', usuariosDelete);

module.exports=router;
