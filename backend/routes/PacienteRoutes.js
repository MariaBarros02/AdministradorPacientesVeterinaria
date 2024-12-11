import express from 'express';

const router = express.Router();

import {agregarPaciente, obtenerPacientes, obtenerPaciente, actualizarPaciente, eliminarPaciente} from '../controllers/PacienteController.js'
import validarAutenticacion from '../middleware/authMiddleware.js';

router
    .route('/')
    .post(validarAutenticacion, agregarPaciente)
    .get(validarAutenticacion, obtenerPacientes);

router
    .route('/:id')
    .get(validarAutenticacion, obtenerPaciente)
    .put(validarAutenticacion, actualizarPaciente)
    .delete(validarAutenticacion, eliminarPaciente);

export default router;
