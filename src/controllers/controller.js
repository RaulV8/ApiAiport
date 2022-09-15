const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const createAirport = async (req, res) => {
    try {
        await prisma.aeropuertos.create({
            data: {
                nombre_aeropuerto: req.body.nombre_aeropuerto,
                estado: "A",
                id_ubicacion: req.body.id_ubicacion          
            }
        })
        res.sendStatus(200).json("Aeropuerto creado con exito.");   
    } catch (error) {
        console.log(error)
    }
}

const createLocation = async (req, res) => {
    await prisma.ubicaciones.create({
        data: {
            nombre_ciudad: req.body.nombre_ciudad,
            codigo_postal: req.body.codigo_postal,
            estado: "A"
        }
    })
    res.sendStatus(200).json({
        message: "Ubicacion creada con exito."
    })
}


const getData = async (req, res) =>{
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

const getDataAirport = async (req, res) =>{
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

const getDataLocation = async (req, res) =>{
    res.json(await prisma.ubicaciones.findMany())
}

const updateAirport = async (req, res) =>{
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

const updateLocation = async (req, res) =>{
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

const deleteAirport = async (req, res) =>{
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