import mongoose from "mongoose";

const pacientesSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: true,
        trim: true,
    },
    especie: {
        type: String,
        require: true,
        trim: true,
    },
    raza:{
        type: String,
        require: true,
        trim: true,
    },
    fechaNacimiento: {
        type: Date,
        default: Date.now(),
    },
    propietario: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
    }, 
    celular: {
        type: String,
        require: true,
        trim: true,
    }, 
    sintomas: {
        type: String,
        require: true,
    },
    fechaCita:{
        type:Date,
        default: Date.now(),
    },
    veterinario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Veterinario"
    }, 

},
{
    timestamps: true,
}
);

const Paciente = mongoose.model('Paciente', pacientesSchema);
export default Paciente;