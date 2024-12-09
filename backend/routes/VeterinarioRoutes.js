import express from 'express'
import { registrar, perfil, confirmarCuenta, iniciarSesion, recuperarPassword,
    comprobarToken, cambiarPassword
 } from '../controllers/VeterinarioController.js';
import validarAutenticacion from '../middleware/authMiddleware.js';

const router = express.Router();

//AREA PUBLICA
router.post('/', registrar);
router.post('/login', iniciarSesion);
router.get('/confirmarCuenta/:token', confirmarCuenta);
router.post('/cambiarPassword', recuperarPassword);
router.route('/cambiarPassword/:token').get(comprobarToken).post(cambiarPassword)


//AREA PRIVADA
router.get('/perfil',validarAutenticacion, perfil);


export default router;