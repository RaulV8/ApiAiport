const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const createAirport = async (req, res) => {
    const airport = await prisma.aeropuertos.create({
        data: {
            nombre_aeropuerto: req.body.nombre_aeropuerto,
            estado: "A",
            id_ubicacion: req.body.id_ubicacion          
        }
    })

    res.json(airport);
}

const createLocation = async (req, res) => {
    const location = await prisma.ubicaciones.create({
        data: {
            nombre_ciudad: req.body.nombre_ciudad,
            codigo_postal: req.body.codigo_postal,
            estado: "A"
        }
    })
    res.json(location);
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
    const airport = await prisma.aeropuertos.update({
        where: {
            id_aeropuerto: parseInt(req.params.id)
        },
        data: {
            nombre_aeropuerto: req.body.nombre_aeropuerto,
            id_ubicacion: req.body.id_ubicacion
        }
    })
    res.json(airport);
}

const updateLocation = async (req, res) =>{
    const location = await prisma.ubicaciones.update({
        where:{
            id_ubicacion: parseInt(req.params.id)
        },
        data:{
            nombre_ciudad: req.body.nombre_ciudad,
            codigo_postal: req.body.codigo_postal
        }
    })
    res.json(location);
}

const deleteAirport = async (req, res) =>{
    const airport = await prisma.aeropuertos.update({
        where: {
            id_aeropuerto: parseInt(req.params.id)
        },
        data: {
            estado: 'D'
        }
    })
    res.json(airport);
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