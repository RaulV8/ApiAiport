const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')

const loginUser = async (req, res) =>{
    const verify = await prisma.accesos.findMany({
        where:{
            usuario: req.body.usuario,
            constrasenia: req.body.constrasenia
        }
    })
    if(verify.length === 0){
        res.json("Usuario o contraseña incorrecta")
    }else{
        jwt.sign({verify},"key",{expiresIn: '120s'},(err,token)=>{
            res.json(token)
        })
        
    }
}



module.exports = loginUser