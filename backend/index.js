import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import veterinarioRoutes from './routes/VeterinarioRoutes.js'

const app = express();
app.use(express.json());
//acceder a las variables ocultas
dotenv.config();
conectarDB();

app.use('/api/veterinario', veterinarioRoutes);

const PORT = process.env.PORT || 4000
app.listen(PORT, ()=> {
    console.log(`Servidor funcionando exitosamente en el puerto ${PORT}`)
});
