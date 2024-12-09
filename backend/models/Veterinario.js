import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import {randomUUID} from 'crypto';

const veterinarioSchema = mongoose.Schema({
    cedula: {
        type: String,
        require: true,
        trim: true,
        unique: true,
    },
    nombres: {
        type: String,
        require: true,
        trim: true,
    },
    apellidos: {
        type: String,
        require: true,
        trim: true,
    },
    genero: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
    celular: {
        type: String,
        require: null,
    },
    telefono: {
        type: String,
        default: null,
    },
    token: {
        type: String,
        default: randomUUID()
    },
    confirmado: {
        type: Boolean,
        default: false,
    },
});

veterinarioSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

veterinarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password);
}

const Veterinario = mongoose.model('veterinario', veterinarioSchema);
export default Veterinario;