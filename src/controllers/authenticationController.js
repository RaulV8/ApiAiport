const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const { encrypt, compare } = require('../helpers/handleBcrypt')
const jwt = require('jsonwebtoken')

const loginUser = async (req, res) => {
    const user =  req.body.usuario
    const password = req.body.contrasenia
    const verify = await prisma.accesos.findMany({
        where:{
            usuario: user 
        }
    })
    if(verify.length === 0){
        res.json({
            message : "Usuario o contraseña incorrecta"
        })
    }else{
        const validate = await compare(password, verify[0].contrasenia)
        if(validate){
            jwt.sign({verify},"secretkey",{expiresIn: '120s'},(error,token)=>{
                res.json({
                    token: token
                })
            })
        }else{
            res.json({
                message : "Usuario o contraseña incorrecta"
            })
        }
    }
}

const registerUser = async (req, res) => {
    const user = req.body.user
    const password = req.body.password
    
    if(password.length < 8 || user.length < 4) {
        res.send({message: "La contraseña debe tener minimo 8 caracteres, y el nombre de usuario debe tener minimo 4 caracteres"}) 
        return
    }else{
        try {
            await prisma.accesos.create({
                data: {
                    usuario: user,
                    contrasenia: await encrypt(password),
                  },
            })
            res.send({
                message: "Usuario registrado con exito."
            })
        } catch (error) {
            res.send({
                message: error
            })
        }
    }
}

module.exports = {
    loginUser,
    registerUser
}