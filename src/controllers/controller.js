const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const createAirport = async (req, res) => {
    const airport = await prisma.aeropuertos.create({
        data: {
            nompre_aeropuerto: req.body.nompre_aeropuerto,
            id_ubicacion: req.body.id_ubicacion
        }
    })

    res.json(airport);
}

const createLocation = async (req, res) => {
    const location = await prisma.ubicaciones.create({
        data: {
            nombre_ciudad: req.body.nombre_ciudad,
            codigo_postal: req.body.codigo_postal
        }
    })
    res.json(location);
}

const getData = (req, res) =>{
    res.json()
}

module.exports = {
    createAirport,
    createLocation
}