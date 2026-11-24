//Requerir modulos
import express from "express"; 
import dotenv from "dotenv";
import routerVeterinarios from "./routers/señales_routes.js";

//Inicializaciones
const app = express();

//Configuraciones
dotenv.config();

//Middlewares
app.use(express.json())
app.use(cors())

//Variables globales
app.set("port",process.env.PORT || 3000);

//Rutas

app.use("/api",routerVeterinarios)


//Exportar instancia de express por medio de app
export default app;

