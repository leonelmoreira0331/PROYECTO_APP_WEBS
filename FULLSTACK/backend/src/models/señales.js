import moongoose from 'mongoose';
import bcrypt from "bcryptjs";
import {randomBytes} from "node:crypto";

const {Schema} = moongoose;

const ParticipantesSchema = new Schema({

    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    direccion: {
        type: String,
        required: true,
        trim: true
    },
    celular: {
        type: String,
        required: true,
        trim: true
    },
    correo: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true
    },
    token: {
        type: String,
        default: null
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    rol: {
        type: String,
        default: 'veterinario'
    }
    
    },
    {
        timestamps: true
    }
);


//Metodo para cifrar password
ParticipantesSchema.methods.encryptPassword = async function(passwordUser){
    const salt = await bcrypt.genSaltSync(10);
    const passwordEncryp = await bcrypt.hashSync(passwordUser, salt);
    return passwordEncryp
}

//Metodo para comprobacion de password
ParticipantesSchema.methods.matchPassword = async function(passwordUser){
    const response = await bcrypt.compare(passwordUser,this.password);
    return response;
    
}

//Metodo para generar token para el correo no JWT
ParticipantesSchema.methods.createToken = function(){
    const tokenGenerado = randomBytes(2).toString('hex').toUpperCase();
    this.token= tokenGenerado;
    return tokenGenerado;

}


export default model('Participantes', ParticipantesSchema);
