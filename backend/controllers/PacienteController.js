import Paciente from "../models/Paciente.js"

const agregarPaciente = async(req, res)=> {
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;

    try {
        const pacienteAlmacenado = await paciente.save();    
        res.json(pacienteAlmacenado)
    } catch (error) {
        res.status(500).json({msg: 'Error en el servidor'})
    }

}
const obtenerPacientes = async(req, res)=> {
    const pacientes = await Paciente.find().where("veterinario").equals(req.veterinario);
    res.json(pacientes);
}
const obtenerPaciente = async(req, res)=> {
    const {id} = req.params;

    try {
        const paciente = await Paciente.findById(id);
        if(!paciente){
            return res.status(404).json({msg: "Paciente no encontrado"} );
        }

        if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
            return res.status(401).json({msg: "Veterinario no autorizado"});
        }

        res.json(paciente)
    } catch (error) {
        res.status(500).json({msg: 'Error en el servidor'})
    }
}
const actualizarPaciente = async(req, res)=> {
    const {id} = req.params;

    try {
        const paciente = await Paciente.findById(id);
        if(!paciente){
            return res.status(404).json({msg: "Paciente no encontrado"} );
        }

        if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
            return res.status(401).json({msg: "Veterinario no autorizado"});
        }

        paciente.nombre = req.body.nombre || paciente.nombre
        paciente.especie = req.body.especie || paciente.especie
        paciente.raza = req.body.raza || paciente.raza
        paciente.fechaNacimiento = req.body.fechaNacimiento || paciente.fechaNacimiento
        paciente.propietario = req.body.propietario || paciente.propietario
        paciente.email = req.body.email || paciente.email
        paciente.celular = req.body.celular || paciente.celular
        paciente.sintomas = req.body.sintomas || paciente.sintomas
        paciente.fechaCita = req.body.fechaCita || paciente.fechaCita

        const pacienteActualizado = await paciente.save();
        res.json(pacienteActualizado);
    } catch (error) {
        res.status(500).json({msg: 'Error en el servidor'})
    }
}
const eliminarPaciente = async(req, res)=> {
    const {id} = req.params;

    try {
        const paciente = await Paciente.findById(id);
        if(!paciente){
            return res.status(404).json({msg: "Paciente no encontrado"} );
        }

        if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
            return res.status(401).json({msg: "Veterinario no autorizado"});
        }
        
        await paciente.deleteOne();
        res.json({mdg: "Paciente Eliminado"})

        
    } catch (error) {
        res.status(500).json({msg: 'Error en el servidor'})
    }
}

export {
    agregarPaciente, obtenerPacientes, obtenerPaciente, actualizarPaciente, eliminarPaciente
}