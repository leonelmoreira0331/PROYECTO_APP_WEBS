import Participantes from "../models/señales.js"


const registro = async (req,res) =>{
    try {
        const {email,password} = req.body;

        if(Object.values(req.body).includes("")){
            return res.status(400).json({msg: "Lo sentimos, debes llenar todos los datos"})
        }

        const verificarEmailBDD = await Participantes.findOne({email})
        if(verificarEmailBDD){
            return res.status(400).json({msg: "Lo sentimos, el email ya se encuentra registrado"})
        }


        const nuevoParticipante = new Participantes(req.body)
        nuevoParticipante.password = await nuevoParticipante.encryptPassword(password)

        res.status(201).json({msg: "Registro existoso"})
    } catch (error) {
        console.log(error)
    }
    
}

export {
    registro
}