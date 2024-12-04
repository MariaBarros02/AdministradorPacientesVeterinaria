import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';

const app = express();
//acceder a las variables ocultas
dotenv.config();
conectarDB();
app.use('/', (req, res)=>{
    res.send('Hola Mundo');
});

const PORT = process.env.PORT || 4000
app.listen(PORT, ()=> {
    console.log(`Servidor funcionando exitosamente en el puerto ${PORT}`)
});
