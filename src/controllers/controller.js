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
        res.send({
            message: "Aeropuerto creado con exito."
        });   
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
    res.send({
        message: "Ubicacion creada con exito"
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
    res.send({
        message: "Aeropuerto actualizado con exito."
    });
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
    res.send({
        message: "Ubicacion actualizada con exito."
    });
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
    res.send({
        message: "Aeropuerto eliminado con exito."
    });
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