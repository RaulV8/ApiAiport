const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')

const createAirport = async (req, res) => {
    jwt.verify(req.token, 'secretkey', async (error, authData) => {
        if(error){
            res.sendStatus(403).json("El usuario no esta autenticado.")
        }else{
            await prisma.aeropuertos.create({
                data: {
                    nombre_aeropuerto: req.body.nombre_aeropuerto,
                    estado: "A",
                    id_ubicacion: req.body.id_ubicacion          
                }
            })
            res.json("Aeropuerto creado con exito.");
        }
    })
}

const createLocation = async (req, res) => {
    jwt.verify(req.token, 'secretkey', async (error, authData) => {
        if(error){
            res.sendStatus(403).json("El usuario no esta autenticado.")
        }else{
            await prisma.ubicaciones.create({
                data: {
                    nombre_ciudad: req.body.nombre_ciudad,
                    codigo_postal: req.body.codigo_postal,
                    estado: "A"
                }
            })
            res.json("Ubicacion creada con exito.")
        }
    })
}


const getData = async (req, res) =>{
    jwt.verify(req.token, 'secretkey', async (error, authData) => {
        if(error){
            res.sendStatus(403).json("El usuario no esta autenticado.")
        }else{
            const data = await prisma.aeropuertos.findMany({
                include: {
                    ubicaciones: true
                },
                where:{
                    estado: "A"
                }
            })
            res.json(data)
        }
    })
}

const getDataAirport = async (req, res) =>{
    jwt.verify(req.token, 'secretkey', async (error, authData) => {
        if(error){
            res.sendStatus(403).json("El usuario no esta autenticado.")
        }else{
            res.json(await prisma.aeropuertos.findMany({
                include: {
                    ubicaciones: {
                        select: {
                            nombre_ciudad:true
                        }
                    }
                }
            }))
        }
    })
    
}

const getDataLocation = async (req, res) =>{
    jwt.verify(req.token, 'secretkey', async (error, authData) => {
        if(error){
            res.sendStatus(403).json("El usuario no esta autenticado.")
        }else{
            res.json(await prisma.ubicaciones.findMany())
        }
    })
}

const updateAirport = async (req, res) =>{
    jwt.verify(req.token, 'secretkey', async (error, authData) => {
        if(error){
            res.sendStatus(403).json("El usuario no esta autenticado.")
        }else{
            await prisma.aeropuertos.update({
                where: {
                    id_aeropuerto: parseInt(req.params.id)
                },
                data: {
                    nombre_aeropuerto: req.body.nombre_aeropuerto,
                    id_ubicacion: req.body.id_ubicacion
                }
            })
            res.json("Aeropuerto actualizado con exito.");
        }
    })
}

const updateLocation = async (req, res) =>{
    jwt.verify(req.token, 'secretkey', async (error, authData) => {
        if(error){
            res.sendStatus(403).json("El usuario no esta autenticado.")
        }else{
            await prisma.ubicaciones.update({
                where:{
                    id_ubicacion: parseInt(req.params.id)
                },
                data:{
                    nombre_ciudad: req.body.nombre_ciudad,
                    codigo_postal: req.body.codigo_postal
                }
            })
            res.json("Ubicacion actualizada con exito.");
        }
    })
}

const deleteAirport = async (req, res) =>{
    jwt.verify(req.token, 'secretkey', async (error, authData) => {
        if (error) {
            res.sendStatus(403).json("El usuario no esta autenticado.")
        } else {
            await prisma.aeropuertos.update({
                where: {
                    id_aeropuerto: parseInt(req.params.id)
                },
                data: {
                    estado: 'D'
                }
            })
            res.json("Aeropuerto eliminado con exito.");
        }
    })
}

module.exports = {
    createAirport,
    createLocation,
    getData,
    getDataLocation,
    getDataAirport,
    updateAirport,
    updateLocation,
    deleteAirport
}