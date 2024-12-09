import jwt from 'jsonwebtoken';
import Veterinario from '../models/Veterinario.js';

const validarAutenticacion = async(req, res, next)=>{
    let token = req.headers.authorization;
    if(token && token.startsWith('Bearer')){

       try {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_JWT);

        req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado");
        return next();
    } catch (error) {

        const e = new Error('Token no valido');
        res.status(401).json({msg: e.message});
        
       }
    } 

    if(!token){
        const error = new Error('Token no valido o inexistente');
        res.status(401).json({msg: error.message});    
    }
   
    next();
}

export default validarAutenticacion;