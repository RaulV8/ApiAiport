const {Router} = require("express")
const router = Router()
const verification = Router()
const jwt = require('jsonwebtoken')
const {createAirport, createLocation, getData,updateAirport,updateLocation, deleteAirport, getDataAirport, getDataLocation} = require("../controllers/controller");
const {loginUser, registerUser} = require("../controllers/authenticationController")

router.post('/location', verification, createLocation)
router.post('/airport', verification,createAirport)
router.get('/data',verification,getData)
router.get('/dataLocation',verification,getDataLocation)
router.get('/dataAirport',verification,getDataAirport)
router.put('/updateLocation/:id',verification, updateLocation)
router.put('/updateAirport/:id',verification, updateAirport)
router.patch('/deleteAirport/:id',verification, deleteAirport)
router.post('/login', loginUser)
router.post('/register', registerUser)

verification.use((req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']

    if(!token){
        res.sendStatus().send({
            error: 'Es necesario un token de autenticacion'
        })
        return
    }
    const aux = token.split(" ")
    if(aux[0] === 'Bearer'){
        token = aux[1]
    }
    if(token){
        jwt.verify(token, 'secretkey', (error, token) => {
            if(error){
                return res.json({
                    message: 'El token no es valido'
                })
            }else{
                req.token = token
                next()
            }
        })
    }
})

module.exports = router