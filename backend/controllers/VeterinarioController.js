import generarJWT from "../helpers/generarJWT.js";
import Veterinario from "../models/Veterinario.js";
import {randomUUID} from 'crypto';

const registrar = async (req, res) => {
    const { email, cedula } = req.body;

    try {
        const existeUsuario = await Veterinario.findOne({$or: [{ email }, {cedula}]});
        if (existeUsuario) {
            const error = new Error('El usuario ya existe');
            return res.status(400).json({ msg: error.message });
        }
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save()
        res.json(veterinarioGuardado);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Error del servidor"})
    }


};
const perfil = (req, res) => {

    const { veterinario}  = req;
    
    res.json({ perfil: veterinario });
};
const confirmarCuenta = async (req, res)=>{
    const {token} = req.params; 
    try {
        const usuarioConfirmar = await Veterinario.findOne({token});
        if(!usuarioConfirmar){
            const error = new Error('Token no valido');
            return res.status(404).json({msg: error.message} )
        }
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();
        res.json({msg: "Se ha confirmado la cuenta"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Error del servidor"})    
    }
    
}

const iniciarSesion = async(req, res)=>{
    const  {email, password} = req.body;

    try {
        const usuario = await Veterinario.findOne({email});
        if(!usuario){
            const error = new Error("El usuario no existe")
            return  res.status(401).json({msg: error.message});
        }
        
        if(!usuario.confirmado){
            const error = new Error("Tu cuenta no ha sido confirmada");
            return  res.status(401).json({msg: error.message});
        }


        if(await usuario.comprobarPassword(password)){
            res.json({token: generarJWT(usuario.id)})
        }else{
            const error = new Error("Tu cuenta no ha sido confirmada");
            return res.status(401).json({msg: error.message});
        }

    } catch (error) {
        res.status(500).json({msg: "Error en el servidor"})
    }
}

const recuperarPassword = async(req, res)=>{
    const {email} = req.body; 

    try {
        const existeVeterinario = await Veterinario.findOne({email});
        if(!existeVeterinario){
            const error = new Error('El usuario no existe');
            return res.status(400).json({ msg: error.message});
        }

        existeVeterinario.token = randomUUID();
        await existeVeterinario.save();

        res.json({ msg: "Hemos enviado un email con las instrucciones para cambiar tu contraseña"})

    } catch (error) {
        res.status(500).json({msg: "Error en el servidor"})
    }
}
const comprobarToken = async(req, res)=>{
    const {token} = req.params;

    try {
        const tokenValido = await Veterinario.findOne({token});   
        
        if(tokenValido){
            res.json({msg: "Token valido y el usuario existe"});

        }else{
            const error = newError("Token no valido");
            return res.status(400).json({msg: error.message});
        }
    } catch (error) {
        
    }
    

}
const cambiarPassword = async(req, res)=>{
    const {token} = req.params;
    const { password} = req.body;

    try {
        const veterinario = await Veterinario.findOne({token});
        if(!veterinario){
            const error = new Error("Hubo un error");
            return res.status(400).json({msg: error.message})
        }

        veterinario.token = null
        veterinario.password = password;
        await veterinario.save();
        res.json({msg: "Tu contraseña se ha mosificado correctamente"})
    } catch (error) {
        
    }
}
export {
    registrar, perfil, confirmarCuenta, iniciarSesion, recuperarPassword,
    comprobarToken, cambiarPassword
} 